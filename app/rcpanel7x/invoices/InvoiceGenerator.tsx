'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================
// TYPES
// ============================================================
interface InvoiceItem {
  desc: string;
  qty: number;
  unit: string;
  price: number;
  total: number;
}

interface HistoryEntry {
  invNo: string;
  date: string;
  buyerName: string;
  buyerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  remarks: string;
  terms: string;
  po: string;
  status: string;
  createdAt: string;
}

interface GlobalData {
  year: number;
  month: number;
  counter: number;
  history: HistoryEntry[];
}

// ============================================================
// CONFIGURATION — Same keys as original RC INVOICES
// ============================================================
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY ?? '$2a$10$hHr99Fi2urp1SDkjQKf5wO8ZikjAKMDu4mH5TCB/.D6z9boGQ2mWG';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID ?? '6a6995bef5f4af5e29cffbfe';

// ============================================================
// CURRENCY FORMATTING — Intl.NumberFormat (same as original)
// ============================================================
const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatIDR(num: number): string {
  return idrFormatter.format(num).replace(/Rp\s?/, 'IDR ');
}

// ============================================================
// NUMBER TO WORDS (English) — same as original
// ============================================================
function numberToWords(n: number): string {
  if (n === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  function chunk(val: number): string {
    if (val === 0) return '';
    if (val < 20) return ones[val];
    if (val < 100) return tens[Math.floor(val / 10)] + (val % 10 ? ' ' + ones[val % 10] : '');
    return ones[Math.floor(val / 100)] + ' Hundred' + (val % 100 ? ' ' + chunk(val % 100) : '');
  }

  let result = '';
  let scaleIndex = 0;
  let remaining = n;
  while (remaining > 0) {
    const rem = remaining % 1000;
    if (rem !== 0) {
      const part = chunk(rem);
      result = part + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + (result ? ' ' : '') + result;
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }
  return result.trim();
}

// ============================================================
// FORMAT DATE — same as original
// ============================================================
function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateTime(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hours}:${minutes}`;
}

// ============================================================
// STATUS OPTIONS
// ============================================================
const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', className: 'inv-status-pending' },
  { value: 'downpayment', label: 'Down Payment', className: 'inv-status-downpayment' },
  { value: 'partial', label: 'Partial Payment', className: 'inv-status-partial' },
  { value: 'paid', label: 'Paid', className: 'inv-status-paid' },
  { value: 'cancelled', label: 'Cancelled', className: 'inv-status-cancelled' },
];

function getStatusBadge(status: string) {
  const opt = STATUS_OPTIONS.find(s => s.value === status);
  if (!opt) return null;
  return <span className={`inv-status-badge ${opt.className}`}>{opt.label}</span>;
}

// ============================================================
// COMPONENT
// ============================================================
export default function InvoiceGenerator() {
  // State
  const [globalData, setGlobalData] = useState<GlobalData>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    counter: 0,
    history: [],
  });
  const [invDate, setInvDate] = useState(new Date().toISOString().split('T')[0]);
  const [invPO, setInvPO] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [invRemarks, setInvRemarks] = useState('This document is issued for customs clearance purposes.');
  const [invTerms, setInvTerms] = useState('Goods sold are non-refundable.');
  const [invStatus, setInvStatus] = useState('pending');
  const [items, setItems] = useState<{ id: number; desc: string; qty: number; unit: string; price: number }[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('rgba(16,185,129,0.95)');
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewingHistoryInvNo, setViewingHistoryInvNo] = useState<string | null>(null);
  const [currentHistoryEntry, setCurrentHistoryEntry] = useState<HistoryEntry | null>(null);

  const itemCountRef = useRef(0);
  const globalDataRef = useRef(globalData);

  // Keep ref in sync with state
  useEffect(() => {
    globalDataRef.current = globalData;
  }, [globalData]);

  // ============================================================
  // TOAST
  // ============================================================
  const showToast = useCallback((message: string, bgColor?: string) => {
    setToastMessage(message);
    setToastColor(bgColor || 'rgba(16,185,129,0.95)');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  // ============================================================
  // JSONBIN API — Same as original
  // ============================================================
  const fetchGlobalData = useCallback(async (): Promise<GlobalData> => {
    try {
      const res = await fetch(`/api/rcpanel7x/invoices`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data.record) {
        const record = data.record as GlobalData;
        if (record.month === undefined) {
          record.month = new Date().getMonth() + 1;
        }
        setGlobalData(record);
        globalDataRef.current = record;
        return record;
      }
    } catch (e) {
      console.error('Failed to fetch database', e);
    }
    return globalDataRef.current;
  }, []);

  const saveGlobalData = useCallback(async (data: GlobalData) => {
    try {
      await fetch(`/api/rcpanel7x/invoices`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error('Failed to save database', e);
    }
  }, []);

  // ============================================================
  // INVOICE NUMBER LOGIC — Same as original
  // ============================================================
  const calculateNextNumber = useCallback((currentYear: number, currentMonth: number, data: GlobalData): number => {
    const history = data.history || [];
    const paddedMonth = String(currentMonth).padStart(2, '0');
    const prefix = `INVRC/${currentYear}/${paddedMonth}/`;

    const usedNumbers = history
      .filter(h => h.invNo && h.invNo.startsWith(prefix))
      .map(h => parseInt(h.invNo.split('/').pop()!, 10))
      .filter(n => !isNaN(n))
      .sort((a, b) => a - b);

    let nextNum = 1;
    for (let i = 0; i < usedNumbers.length; i++) {
      if (usedNumbers[i] === nextNum) {
        nextNum++;
      } else if (usedNumbers[i] > nextNum) {
        break;
      }
    }
    return nextNum;
  }, []);

  const getNextInvoiceNumber = useCallback((data: GlobalData): string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const nextNum = calculateNextNumber(currentYear, currentMonth, data);
    const paddedCounter = String(nextNum).padStart(3, '0');
    const paddedMonth = String(currentMonth).padStart(2, '0');
    return `INVRC/${currentYear}/${paddedMonth}/${paddedCounter}`;
  }, [calculateNextNumber]);

  const commitInvoiceNumber = useCallback(async (data: GlobalData): Promise<{ invNo: string; updatedData: GlobalData }> => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const nextNum = calculateNextNumber(currentYear, currentMonth, data);

    const updated = { ...data };
    if (updated.year !== currentYear || updated.month !== currentMonth) {
      updated.counter = 0;
      updated.year = currentYear;
      updated.month = currentMonth;
    }
    updated.counter = Math.max(updated.counter, nextNum);

    const paddedCounter = String(nextNum).padStart(3, '0');
    const paddedMonth = String(currentMonth).padStart(2, '0');
    const invNo = `INVRC/${currentYear}/${paddedMonth}/${paddedCounter}`;

    return { invNo, updatedData: updated };
  }, [calculateNextNumber]);

  // ============================================================
  // ITEM MANAGEMENT — Same as original
  // ============================================================
  const addItem = useCallback(() => {
    itemCountRef.current++;
    setItems(prev => [...prev, {
      id: itemCountRef.current,
      desc: '',
      qty: 1,
      unit: 'Pcs',
      price: 0,
    }]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: number, field: string, value: string | number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const computedRows = items.map(item => ({
    ...item,
    total: item.qty * item.price,
  }));

  const filledRows = computedRows.filter(r => r.desc.trim() || r.price > 0);
  const subtotal = computedRows.reduce((sum, r) => sum + r.total, 0);

  const displayInvNo = viewingHistoryInvNo || getNextInvoiceNumber(globalData);

  // Pad to at least 4 rows for display
  const totalDisplayRows = Math.max(4, filledRows.length);
  const emptyRowCount = totalDisplayRows - filledRows.length;

  // ============================================================
  // INIT
  // ============================================================
  useEffect(() => {
    let mounted = true;
    async function init() {
      showToast('🔄 Loading database...', '#6366f1');
      const data = await fetchGlobalData();
      if (mounted) {
        setLoading(false);
        addItem(); // Initial item
        showToast('✅ Database loaded!', '#10b981');
      }
    }
    init();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // HISTORY
  // ============================================================
  const saveToHistory = useCallback(async (invNo: string, currentData: GlobalData) => {
    const historyItems: InvoiceItem[] = [];
    let historySubtotal = 0;

    items.forEach(item => {
      const total = item.qty * item.price;
      historySubtotal += total;
      if (item.desc.trim()) {
        historyItems.push({
          desc: item.desc.trim(),
          qty: item.qty,
          unit: item.unit,
          price: item.price,
          total,
        });
      }
    });

    const entry: HistoryEntry = {
      invNo,
      date: invDate,
      buyerName: buyerName.trim(),
      buyerAddress: buyerAddress.trim(),
      items: historyItems,
      subtotal: historySubtotal,
      remarks: invRemarks.trim(),
      terms: invTerms.trim(),
      po: invPO.trim(),
      status: invStatus,
      createdAt: new Date().toISOString(),
    };

    const updatedData = {
      ...currentData,
      history: [entry, ...(currentData.history || [])].slice(0, 50),
    };

    setGlobalData(updatedData);
    globalDataRef.current = updatedData;
    setCurrentHistoryEntry(entry);
    await saveGlobalData(updatedData);

    return updatedData;
  }, [items, invDate, buyerName, buyerAddress, invRemarks, invTerms, invPO, invStatus, saveGlobalData]);

  const loadHistory = useCallback((invNo: string) => {
    const history = globalData.history || [];
    const inv = history.find(h => h.invNo === invNo);
    if (!inv) return;

    setInvDate(inv.date);
    setInvPO(inv.po || '');
    setBuyerName(inv.buyerName);
    setBuyerAddress(inv.buyerAddress);
    setInvRemarks(inv.remarks || '');
    setInvTerms(inv.terms || '');
    setInvStatus(inv.status || 'pending');

    // Rebuild items
    itemCountRef.current = 0;
    const newItems = inv.items.map(item => {
      itemCountRef.current++;
      return {
        id: itemCountRef.current,
        desc: item.desc,
        qty: item.qty,
        unit: item.unit,
        price: item.price,
      };
    });
    setItems(newItems.length > 0 ? newItems : [{ id: ++itemCountRef.current, desc: '', qty: 1, unit: 'Pcs', price: 0 }]);

    setViewingHistoryInvNo(invNo);
    setCurrentHistoryEntry(inv);
    showToast('📋 Loaded invoice ' + invNo, '#6366f1');
  }, [globalData, showToast]);

  const deleteHistoryItem = useCallback(async (invNo: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete invoice ${invNo}?`)) return;

    const updatedData = {
      ...globalDataRef.current,
      history: (globalDataRef.current.history || []).filter(h => h.invNo !== invNo),
    };

    setGlobalData(updatedData);
    globalDataRef.current = updatedData;
    await saveGlobalData(updatedData);
    showToast(`🗑️ Deleted invoice ${invNo}`, '#ef4444');
  }, [saveGlobalData, showToast]);

  // ============================================================
  // PRINT INVOICE — Same logic as original
  // ============================================================
  const printInvoice = useCallback(async () => {
    if (!buyerName.trim()) {
      showToast('⚠️ Please enter buyer name!', '#ef4444');
      return;
    }

    const hasItem = items.some(item => item.desc.trim());
    if (!hasItem) {
      showToast('⚠️ Please add at least one item!', '#ef4444');
      return;
    }

    showToast('💾 Saving invoice...', '#6366f1');

    // Sync with database
    const freshData = await fetchGlobalData();

    // Commit invoice number
    const { invNo, updatedData } = await commitInvoiceNumber(freshData);
    setViewingHistoryInvNo(invNo);

    // Save to history
    const finalData = await saveToHistory(invNo, updatedData);

    showToast('✅ Invoice saved! Opening print dialog...', '#10b981');

    setTimeout(() => {
      window.print();
    }, 600);
  }, [buyerName, items, fetchGlobalData, commitInvoiceNumber, saveToHistory, showToast]);

  // ============================================================
  // RESET FORM — Same as original
  // ============================================================
  const resetForm = useCallback(() => {
    setInvDate(new Date().toISOString().split('T')[0]);
    setInvPO('');
    setBuyerName('');
    setBuyerAddress('');
    setInvRemarks('This document is issued for customs clearance purposes.');
    setInvTerms('Goods sold are non-refundable.');
    setInvStatus('pending');
    itemCountRef.current = 0;
    setItems([]);
    setViewingHistoryInvNo(null);
    setCurrentHistoryEntry(null);
    setTimeout(() => addItem(), 0);
    showToast('🔄 Form reset — ready for new invoice', '#3b82f6');
  }, [addItem, showToast]);

  // ============================================================
  // RENDER
  // ============================================================
  const history = globalData.history || [];
  const matchedHistoryEntry = currentHistoryEntry || (viewingHistoryInvNo ? history.find(h => h.invNo === viewingHistoryInvNo) || null : null);
  const historyStatusLabel = matchedHistoryEntry
    ? STATUS_OPTIONS.find(opt => opt.value === matchedHistoryEntry.status)?.label || matchedHistoryEntry.status
    : 'Draft';
  const historySubtitle = matchedHistoryEntry
    ? `Saved on ${formatDateTime(matchedHistoryEntry.createdAt)}`
    : 'This invoice has not been archived yet.';

  return (
    <div className="inv-app">
      <div className="inv-app-container">

        {/* ======================== SIDEBAR ======================== */}
        <aside className="inv-sidebar">

          <div className="inv-sidebar-logo">
            <div className="inv-logo-icon">RC</div>
            <h1><span className="notranslate" translate="no">Royyan Collectibles</span><span>Invoice Generator System</span></h1>
          </div>

          <div className="inv-sidebar-divider" />

          {/* Invoice Number Badge */}
          <div className="inv-invoice-badge">
            <div className="inv-badge-icon">📄</div>
            <div className="inv-badge-info">
              <div className="inv-badge-label">Next Invoice Number</div>
              <div className="inv-badge-value">{displayInvNo}</div>
            </div>
          </div>

          {/* INVOICE META */}
          <div className="inv-form-section-title">Invoice Details</div>
          <div className="inv-form-row">
            <div className="inv-form-group">
              <label>Invoice Date</label>
              <input
                type="date"
                value={invDate}
                onChange={e => setInvDate(e.target.value)}
              />
            </div>
            <div className="inv-form-group">
              <label>PO Number</label>
              <input
                type="text"
                value={invPO}
                onChange={e => setInvPO(e.target.value)}
                placeholder="— (optional)"
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="inv-form-group">
            <label>Invoice Status</label>
            <select value={invStatus} onChange={e => setInvStatus(e.target.value)}>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="inv-sidebar-divider" />

          {/* BUYER INFO */}
          <div className="inv-form-section-title">Buyer Information</div>
          <div className="inv-form-group">
            <label>Buyer Name</label>
            <input
              type="text"
              value={buyerName}
              onChange={e => setBuyerName(e.target.value)}
              placeholder="e.g. Patrice Brun"
            />
          </div>
          <div className="inv-form-group">
            <label>Address</label>
            <textarea
              value={buyerAddress}
              onChange={e => setBuyerAddress(e.target.value)}
              placeholder="e.g. 73 Rue de Rivoli, 59800 Lille, France"
              rows={2}
            />
          </div>

          <div className="inv-sidebar-divider" />

          {/* ITEMS */}
          <div className="inv-form-section-title">Products / Items</div>
          <div>
            {items.map((item, index) => (
              <div key={item.id} className="inv-item-card">
                <div className="inv-item-number">{index + 1}</div>
                <div className="inv-item-header">
                  <span>Item #{index + 1}</span>
                  <button
                    className="inv-btn-remove-item"
                    onClick={() => removeItem(item.id)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
                <div className="inv-form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={e => updateItem(item.id, 'desc', e.target.value)}
                    placeholder="e.g. Tintin: The Crab with the Golden Claws"
                  />
                </div>
                <div className="inv-form-row">
                  <div className="inv-form-group" style={{ flex: 0.5 }}>
                    <label>Qty</label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                      min={1}
                    />
                  </div>
                  <div className="inv-form-group" style={{ flex: 0.5 }}>
                    <label>Unit</label>
                    <select
                      value={item.unit}
                      onChange={e => updateItem(item.id, 'unit', e.target.value)}
                    >
                      <option value="Pcs">Pcs</option>
                      <option value="Pkg">Pkg</option>
                      <option value="Set">Set</option>
                      <option value="Box">Box</option>
                      <option value="Lot">Lot</option>
                    </select>
                  </div>
                  <div className="inv-form-group">
                    <label>Unit Price (IDR)</label>
                    <input
                      type="number"
                      value={item.price || ''}
                      onChange={e => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      placeholder="e.g. 700000"
                      min={0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="inv-btn-add-item" onClick={addItem}>＋ Add Item</button>

          {/* NOTES */}
          <div className="inv-form-section-title">Notes</div>
          <div className="inv-form-row">
            <div className="inv-form-group">
              <label>Remarks</label>
              <textarea
                value={invRemarks}
                onChange={e => setInvRemarks(e.target.value)}
                rows={2}
                placeholder="e.g. For customs clearance purposes"
              />
            </div>
            <div className="inv-form-group">
              <label>Terms &amp; Conditions</label>
              <textarea
                value={invTerms}
                onChange={e => setInvTerms(e.target.value)}
                rows={2}
                placeholder="e.g. Non-refundable"
              />
            </div>
          </div>

          <div className="inv-sidebar-divider" />

          {/* ACTIONS */}
          <div className="inv-action-buttons">
            <button className="inv-btn-primary" onClick={printInvoice}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Invoice
            </button>
            <button className="inv-btn-secondary" onClick={() => showToast('🔄 Preview updated!', '#6366f1')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Preview
            </button>
          </div>
          <div className="inv-print-hint">Atau tekan <kbd>Ctrl</kbd> + <kbd>P</kbd> untuk print</div>
          <button className="inv-btn-reset" onClick={resetForm}>🗑 Reset Form &amp; Start New Invoice</button>

          <div className="inv-sidebar-divider" />

          {/* HISTORY */}
          <div className="inv-form-section-title">Recent Invoices</div>
          <div className="inv-history-section">
            {history.length === 0 ? (
              <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center', padding: '14px 0' }}>No invoices yet</p>
            ) : (
              history.slice(0, 10).map(h => (
                <div
                  key={h.invNo}
                  className="inv-history-item"
                  onClick={() => loadHistory(h.invNo)}
                >
                  <div className="inv-hi-left">
                    <span className="inv-hi-inv">{h.invNo}</span>
                    <span className="inv-hi-buyer">{h.buyerName} — {formatDate(h.date)}</span>
                    {h.status && getStatusBadge(h.status)}
                  </div>
                  <div className="inv-hi-actions">
                    <span className="inv-hi-total">{formatIDR(h.subtotal)}</span>
                    <button
                      className="inv-btn-delete-history"
                      onClick={(e) => deleteHistoryItem(h.invNo, e)}
                      title="Delete Invoice"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ======================== PREVIEW ======================== */}
        <main className="inv-main-content">
          <div className="inv-preview-label">Live Invoice Preview</div>

          <div className="inv-invoice-page">
            {/* TOP GOLD BAR */}
            <div className="inv-top-bar" />

            <div className="inv-inner">
              {/* HEADER */}
              <div className="inv-header">
                <div className="inv-brand-block">
                  <p className="inv-brand-sub">Proforma Invoice</p>
                  <p className="inv-brand-name">Royyan</p>
                  <p className="inv-brand-tagline">Collectibles</p>
                  <div className="inv-brand-contact">
                    <div className="inv-contact-line"><span className="inv-contact-icon">📍</span> Curug Street no 33, West Java, Indonesia</div>
                    <div className="inv-contact-line"><span className="inv-contact-icon">📞</span> +62 813 1527 855</div>
                  </div>
                </div>
                <div className="inv-doc-title-block">
                  <p className="inv-doc-title">Invoice</p>
                  <table className="inv-doc-meta">
                    <tbody>
                      <tr>
                        <td className="inv-meta-label">Invoice No.</td>
                        <td className="inv-meta-value">{displayInvNo}</td>
                      </tr>
                      <tr>
                        <td className="inv-meta-label">Date</td>
                        <td className="inv-meta-value">{formatDate(invDate)}</td>
                      </tr>
                      <tr>
                        <td className="inv-meta-label">PO. No</td>
                        <td className="inv-meta-value">{invPO.trim() || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BILL TO */}
              <div className="inv-bill-section">
                <div className="inv-section-label">Billed To</div>
                <div className="inv-bill-name">{buyerName.trim() || '—'}</div>
                <div className="inv-bill-address">{buyerAddress.trim() || '—'}</div>
              </div>

              {/* ITEMS TABLE */}
              <table className="inv-items">
                <thead>
                  <tr>
                    <th className="inv-col-num">No</th>
                    <th>Description</th>
                    <th className="inv-col-qty">Qty</th>
                    <th className="inv-col-unit">Unit</th>
                    <th className="inv-col-price">Unit Price (IDR)</th>
                    <th className="inv-col-total">Total (IDR)</th>
                  </tr>
                </thead>
                <tbody>
                  {filledRows.map((row, i) => (
                    <tr key={row.id}>
                      <td className="inv-col-num">{i + 1}</td>
                      <td>{row.desc || '—'}</td>
                      <td className="inv-col-qty">{row.qty}</td>
                      <td className="inv-col-unit">{row.unit}</td>
                      <td className="inv-col-price">{formatIDR(row.price)}</td>
                      <td className="inv-col-total">{formatIDR(row.total)}</td>
                    </tr>
                  ))}
                  {Array.from({ length: emptyRowCount }).map((_, i) => (
                    <tr key={`empty-${i}`} className="inv-empty">
                      <td className="inv-col-num">{filledRows.length + i + 1}</td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOTALS */}
              <div className="inv-totals-wrap">
                <table className="inv-totals">
                  <tbody>
                    <tr>
                      <td className="inv-totals-label">Subtotal</td>
                      <td className="inv-totals-value">{formatIDR(subtotal)}</td>
                    </tr>
                    <tr>
                      <td className="inv-totals-label">VAT 0%</td>
                      <td className="inv-totals-value">IDR 0</td>
                    </tr>
                    <tr className="inv-grand">
                      <td className="inv-totals-label">Total</td>
                      <td className="inv-totals-value">{formatIDR(subtotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inv-history-tracker">
                <div className="inv-history-tracker-header">Invoice History Tracker</div>
                <div className="inv-history-tracker-grid">
                  <div>
                    <div className="inv-history-label">Record Status</div>
                    <div className="inv-history-value">{historyStatusLabel}</div>
                  </div>
                  <div>
                    <div className="inv-history-label">Record Created</div>
                    <div className="inv-history-value">{matchedHistoryEntry ? formatDateTime(matchedHistoryEntry.createdAt) : historySubtitle}</div>
                  </div>
                  <div>
                    <div className="inv-history-label">History Count</div>
                    <div className="inv-history-value">{history.length}</div>
                  </div>
                </div>
              </div>

              <div className="inv-in-words">
                In Words: <b>{numberToWords(subtotal)} Rupiah</b>
              </div>

              {/* NOTES */}
              <div className="inv-notes-grid">
                <div className="inv-notes-col">
                  <div className="inv-section-label">Remarks</div>
                  <p>{invRemarks.trim() || '—'}</p>
                </div>
                <div className="inv-notes-col">
                  <div className="inv-section-label">Terms &amp; Conditions</div>
                  <p>{invTerms.trim() || '—'}</p>
                </div>
              </div>

              {/* SIGNATURE & STAMP */}
              <div className="inv-signature-section">
                <div className="inv-sign-left">
                  <div className="inv-stamp-placeholder">
                    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="stampTexture" x="-5%" y="-5%" width="110%" height="110%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} seed={5} result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale={2} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        <path id="topArcDonut" d="M 37.5,120 A 82.5,82.5 0 0,1 202.5,120" fill="none" />
                        <path id="bottomArcDonut" d="M 202.5,120 A 82.5,82.5 0 0,1 37.5,120" fill="none" />
                      </defs>
                      <g filter="url(#stampTexture)" opacity="0.85">
                        {/* Outer Double Ring */}
                        <circle cx="120" cy="120" r="110" fill="none" stroke="#c0392b" strokeWidth="4" />
                        <circle cx="120" cy="120" r="105" fill="none" stroke="#c0392b" strokeWidth="1.5" />

                        {/* Inner Double Ring */}
                        <circle cx="120" cy="120" r="66" fill="none" stroke="#c0392b" strokeWidth="1.5" />
                        <circle cx="120" cy="120" r="61" fill="none" stroke="#c0392b" strokeWidth="3" />

                        {/* Circular Text */}
                        <text fill="#c0392b" fontFamily="'Inter', sans-serif" fontSize="14" fontWeight="900" letterSpacing="3.5">
                          <textPath href="#topArcDonut" startOffset="50%" textAnchor="middle">COLLECTIBLES ITEM</textPath>
                        </text>
                        <text fill="#c0392b" fontFamily="'Inter', sans-serif" fontSize="13" fontWeight="700" letterSpacing="2.5">
                          <textPath href="#bottomArcDonut" startOffset="50%" textAnchor="middle">WEST JAVA INDONESIA</textPath>
                        </text>

                        {/* Center Text */}
                        <text x="120" y="106" textAnchor="middle" fill="#c0392b" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="900" letterSpacing="1.5">PAID IN FULL</text>

                        {/* Center Divider */}
                        <line x1="72" y1="115" x2="168" y2="115" stroke="#c0392b" strokeWidth="2" strokeDasharray="3,2" />

                        <text x="120" y="132" textAnchor="middle" fill="#c0392b" fontFamily="'Inter', sans-serif" fontSize="14" fontWeight="900" letterSpacing="3">ORIGINAL</text>

                        {/* Small Stars */}
                        <text x="25" y="125" textAnchor="middle" fill="#c0392b" fontSize="12">★</text>
                        <text x="215" y="125" textAnchor="middle" fill="#c0392b" fontSize="12">★</text>
                      </g>
                    </svg>
                  </div>
                  <div className="inv-sincerely">Sincerely,<br /><strong><span className="notranslate" translate="no">Royyan Collectibles</span></strong></div>
                </div>
                <div />
              </div>

              <div className="inv-footer-line"><span className="notranslate" translate="no">Royyan Collectibles</span> · Curug Street no 33, West Java, Indonesia · +62 813 1527 855</div>
            </div>
          </div>
        </main>
      </div>

      {/* TOAST */}
      <div
        className={`inv-toast ${toastVisible ? 'inv-toast-show' : ''}`}
        style={{ background: toastColor }}
      >
        {toastMessage}
      </div>
    </div>
  );
}
