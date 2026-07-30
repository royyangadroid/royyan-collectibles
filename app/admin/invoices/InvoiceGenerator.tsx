'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, FileText, Gift, Trash2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  price: number;
}

interface SavedInvoice {
  id: string;
  number: string;
  date: string;
  buyerName: string;
  buyerAddress: string;
  poNumber: string;
  items: InvoiceItem[];
  subtotal: number;
  remarks: string;
  terms: string;
}

const STORAGE_KEY = 'rc-admin-invoice-data';
const COUNTER_KEY_PREFIX = 'rc-admin-invoice-counter-';
const DEFAULT_REMARKS = 'This document is issued for customs clearance purposes.';
const DEFAULT_TERMS = 'Goods sold are non-refundable.';

function formatIDR(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

function getMonthKey(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function getNextInvoiceNumber(counter: number, dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `INVRC/${year}/${month}/${String(counter).padStart(3, '0')}`;
}

export default function InvoiceGenerator() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [invoiceCounter, setInvoiceCounter] = useState(1);
  const [invoiceNumber, setInvoiceNumber] = useState('INVRC/2026/01/001');
  const [poNumber, setPoNumber] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [remarks, setRemarks] = useState(DEFAULT_REMARKS);
  const [terms, setTerms] = useState(DEFAULT_TERMS);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [history, setHistory] = useState<SavedInvoice[]>([]);
  const [toast, setToast] = useState('');
  const [autoNumberingEnabled, setAutoNumberingEnabled] = useState(true);

  const periodKey = useMemo(() => getMonthKey(date), [date]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setHistory(JSON.parse(savedData));
      } catch {
        setHistory([]);
      }
    }

    if (items.length === 0) {
      setItems([{ id: 'item-1', description: '', qty: 1, unit: 'Pcs', price: 0 }]);
    }
  }, []);

  useEffect(() => {
    const savedCounter = Number(localStorage.getItem(`${COUNTER_KEY_PREFIX}${periodKey}`) || '1');
    setInvoiceCounter(savedCounter);
  }, [periodKey]);

  useEffect(() => {
    const nextInvoice = getNextInvoiceNumber(invoiceCounter, date);
    if (autoNumberingEnabled) {
      setInvoiceNumber(nextInvoice);
    }
  }, [invoiceCounter, date, autoNumberingEnabled]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items],
  );

  const filledItems = items.filter((item) => item.description.trim() || item.price > 0).length;
  const currentMonthSavedCount = history.filter((invoice) => getMonthKey(invoice.date) === periodKey).length;

  function updateItem(id: string, data: Partial<InvoiceItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: '',
        qty: 1,
        unit: 'Pcs',
        price: 0,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function persistHistory(nextHistory: SavedInvoice[]) {
    setHistory(nextHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
  }

  function saveInvoice() {
    const invoice: SavedInvoice = {
      id: String(Date.now()),
      number: invoiceNumber,
      date,
      buyerName,
      buyerAddress,
      poNumber,
      items,
      subtotal,
      remarks,
      terms,
    };

    const nextCounter = invoiceCounter + 1;
    localStorage.setItem(`${COUNTER_KEY_PREFIX}${periodKey}`, String(nextCounter));
    setInvoiceCounter(nextCounter);

    persistHistory([invoice, ...history].slice(0, 50));

    setAutoNumberingEnabled(false);
    setToast(`Invoice ${invoice.number} telah disimpan.`);
    window.setTimeout(() => setToast(''), 3000);

    return invoice;
  }

  function loadHistory(invoiceId: string) {
    const invoice = history.find((entry) => entry.id === invoiceId);
    if (!invoice) return;

    setAutoNumberingEnabled(false);
    setInvoiceNumber(invoice.number);
    setDate(invoice.date);
    setPoNumber(invoice.poNumber);
    setBuyerName(invoice.buyerName);
    setBuyerAddress(invoice.buyerAddress);
    setRemarks(invoice.remarks);
    setTerms(invoice.terms);
    setItems(invoice.items.length ? invoice.items : [{ id: 'item-1', description: '', qty: 1, unit: 'Pcs', price: 0 }]);
  }

  function deleteHistory(invoiceId: string) {
    persistHistory(history.filter((entry) => entry.id !== invoiceId));
  }

  function handlePrint() {
    saveInvoice();
    window.setTimeout(() => window.print(), 200);
  }

  return (
    <>
      <div className="print-hidden grid gap-8 xl:grid-cols-[1fr,1.05fr]">
        <aside className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Invoice Generator</p>
            <h1 className="text-3xl font-semibold text-parchment-100">Royyan Collectibles</h1>
            <p className="text-sm text-zinc-400">Auto invoice numbering, preview, save record, and print-ready invoice output.</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
            <div className="flex items-center justify-between gap-3 text-sm text-zinc-400">
              <span className="uppercase tracking-[0.3em] text-zinc-500">Next Invoice</span>
              <span className="text-gold font-semibold">{invoiceNumber}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-300">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Period</p>
                <p className="mt-2 font-semibold text-parchment-100">{periodKey}</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Saved</p>
                <p className="mt-2 font-semibold text-gold">{currentMonthSavedCount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Invoice Info</p>
              <div className="mt-4 grid gap-4">
                <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">Invoice Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                />
                <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">PO Number</label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Buyer Details</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">Buyer Name</label>
                  <input
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Nama pembeli"
                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">Address</label>
                  <textarea
                    rows={3}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="Alamat pembeli"
                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Notes</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">Remarks</label>
                  <textarea
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">Terms</label>
                  <textarea
                    rows={2}
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-parchment-100">Invoice Items</p>
                  <p className="text-xs text-zinc-500">Isi data item untuk melihat preview otomatis.</p>
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/15"
                >
                  <Gift className="h-4 w-4" />
                  Tambah Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-parchment-100">Item #{index + 1}</p>
                        <p className="text-xs text-zinc-500">Isi detail, qty, satuan, harga</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 grid gap-3 lg:grid-cols-4">
                      <div className="lg:col-span-2">
                        <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">Description</label>
                        <input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                          placeholder="Nama produk atau deskripsi"
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">Qty</label>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) || 1 })}
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">Unit</label>
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                        >
                          <option value="Pcs">Pcs</option>
                          <option value="Set">Set</option>
                          <option value="Box">Box</option>
                          <option value="Lot">Lot</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">Unit Price</label>
                        <input
                          type="number"
                          min={0}
                          value={item.price}
                          onChange={(e) => updateItem(item.id, { price: Number(e.target.value) || 0 })}
                          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-parchment-100 outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Actions</p>
              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full rounded-2xl bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90"
                >
                  <FileText className="h-4 w-4 inline-block mr-2" />
                  Save & Print Invoice
                </button>
                <button
                  type="button"
                          onClick={saveInvoice}
                  className="w-full rounded-2xl border border-gold/30 bg-zinc-950 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
                >
                  <ArrowRight className="h-4 w-4 inline-block mr-2" />
                  Save Record
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAutoNumberingEnabled(true);
                    setInvoiceNumber(getNextInvoiceNumber(invoiceCounter, date));
                    setDate(new Date().toISOString().slice(0, 10));
                    setPoNumber('');
                    setBuyerName('');
                    setBuyerAddress('');
                    setRemarks(DEFAULT_REMARKS);
                    setTerms(DEFAULT_TERMS);
                    setItems([{ id: `item-${Date.now()}`, description: '', qty: 1, unit: 'Pcs', price: 0 }]);
                  }}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900"
                >
                  New Invoice
                </button>
              </div>
              {toast ? (
                <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{toast}</div>
              ) : null}
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Recent Invoices</p>
              <div className="mt-4 space-y-3">
                {history.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-5 text-sm text-zinc-500 text-center">
                    Belum ada invoice tersimpan.
                  </div>
                ) : (
                  history.slice(0, 6).map((invoice) => (
                    <div key={invoice.id} className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-parchment-100">{invoice.number}</p>
                          <p className="text-xs text-zinc-500">{invoice.buyerName || 'No buyer'}</p>
                          <p className="mt-2 text-xs text-zinc-500">{new Date(invoice.date).toLocaleDateString('id-ID')}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteHistory(invoice.id)}
                          className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/15"
                        >
                          Delete
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => loadHistory(invoice.id)}
                        className="mt-4 w-full rounded-2xl border border-gold/30 bg-gold/10 px-3 py-3 text-sm font-semibold text-gold transition hover:bg-gold/15"
                      >
                        Load Invoice
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Live Invoice Preview</p>
                <h2 className="mt-2 text-2xl font-semibold text-parchment-100">Invoice {invoiceNumber}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 text-sm text-zinc-300">
                  <p className="text-zinc-500">Subtotal</p>
                  <p className="mt-2 text-lg font-semibold text-parchment-100">{formatIDR(subtotal)}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 text-sm text-zinc-300">
                  <p className="text-zinc-500">Items</p>
                  <p className="mt-2 text-lg font-semibold text-parchment-100">{items.length}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 text-sm text-zinc-300">
                  <p className="text-zinc-500">Filled Lines</p>
                  <p className="mt-2 text-lg font-semibold text-parchment-100">{filledItems}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 text-zinc-300">
              <div className="grid gap-4 xl:grid-cols-[1.4fr,0.8fr]">
                <div className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Invoice Number</p>
                      <p className="mt-2 text-base font-semibold text-parchment-100">{invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Date</p>
                      <p className="mt-2 text-base font-semibold text-parchment-100">{new Date(date).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Billed To</p>
                    <p className="mt-2 text-base font-semibold text-parchment-100">{buyerName || 'Belum diisi'}</p>
                    <p className="mt-1 text-sm text-zinc-500">{buyerAddress || 'Alamat belum diisi'}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-zinc-500">PO Number</p>
                    <p className="mt-1 text-sm text-parchment-100">{poNumber || '-'}</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <div className="grid gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Notes</span>
                      <p className="mt-2 text-sm text-zinc-300">{remarks || '-'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Terms</span>
                      <p className="mt-2 text-sm text-zinc-300">{terms || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/70">
              <div className="grid grid-cols-[1fr,1fr,0.8fr,0.9fr,0.9fr,0.9fr] gap-4 bg-zinc-900/90 px-4 py-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
                <span>No</span>
                <span>Description</span>
                <span className="text-right">Qty</span>
                <span className="text-center">Unit</span>
                <span className="text-right">Unit Price</span>
                <span className="text-right">Total</span>
              </div>
              <div className="divide-y divide-zinc-800">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-[1fr,1fr,0.8fr,0.9fr,0.9fr,0.9fr] gap-4 px-4 py-4 text-sm text-zinc-300">
                    <span className="text-zinc-400">{index + 1}</span>
                    <span>{item.description || '—'}</span>
                    <span className="text-right">{item.qty}</span>
                    <span className="text-center">{item.unit}</span>
                    <span className="text-right">{formatIDR(item.price)}</span>
                    <span className="text-right font-semibold text-parchment-100">{formatIDR(item.qty * item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[1fr,1fr,0.8fr,0.9fr,0.9fr,0.9fr] gap-4 px-4 py-4 text-sm font-semibold text-parchment-100">
                <span />
                <span />
                <span />
                <span />
                <span>Subtotal</span>
                <span className="text-right">{formatIDR(subtotal)}</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <section className="invoice-print hidden bg-white text-black p-8 print-block">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col justify-between gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Royyan Collectibles</p>
              <h1 className="mt-3 text-3xl font-semibold text-zinc-900">Invoice</h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600">Terbit secara otomatis untuk dokumentasi penjualan barang koleksi.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Invoice Number</p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">{invoiceNumber}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Invoice Date</p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">{new Date(date).toLocaleDateString('id-ID')}</p>
                <p className="mt-3 text-sm text-zinc-700">PO Number: {poNumber || '-'}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Billed To</p>
              <p className="mt-3 text-base font-semibold text-zinc-900">{buyerName || '-'}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{buyerAddress || '-'}</p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Notes</p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">{remarks || '-'}</p>
              <div className="mt-6 border-t border-zinc-200 pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Terms</p>
                <p className="mt-3 text-sm leading-6 text-zinc-700">{terms || '-'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="grid grid-cols-[0.7fr,2.5fr,0.7fr,0.9fr,1.2fr] gap-4 bg-zinc-100 px-5 py-4 text-xs uppercase tracking-[0.3em] text-zinc-600">
              <span>No</span>
              <span>Description</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Unit Price</span>
              <span className="text-right">Total</span>
            </div>
            <div className="divide-y divide-zinc-200">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[0.7fr,2.5fr,0.7fr,0.9fr,1.2fr] gap-4 px-5 py-4 text-sm text-zinc-800">
                  <span className="font-semibold">{index + 1}</span>
                  <span>{item.description || '—'}</span>
                  <span className="text-right">{item.qty}</span>
                  <span className="text-right">{formatIDR(item.price)}</span>
                  <span className="text-right font-semibold">{formatIDR(item.qty * item.price)}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[0.7fr,2.5fr,0.7fr,0.9fr,1.2fr] gap-4 px-5 py-4 text-sm font-semibold text-zinc-900">
              <span />
              <span />
              <span />
              <span>Subtotal</span>
              <span className="text-right">{formatIDR(subtotal)}</span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-sm leading-6 text-zinc-700">
            <p className="font-semibold text-zinc-900">Invoice Terms</p>
            <p className="mt-3">Pastikan pembayaran dilakukan sesuai PO dan alamat pengiriman tercantum dengan benar. Barang yang sudah diterima akan diproses dan dikirim sesuai jadwal.</p>
          </div>
        </div>
      </section>
    </>
  );
}
