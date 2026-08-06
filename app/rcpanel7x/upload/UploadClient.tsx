'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AdminPreview, { type PreviewData } from '@/components/AdminPreview';

export default function UploadClient({ 
  nextNumber, 
  previousNumber 
}: { 
  nextNumber: string; 
  previousNumber: string | null; 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedNumberOption, setSelectedNumberOption] = useState<'next' | 'previous' | 'custom'>('next');
  const [customNumber, setCustomNumber] = useState('');

  const [previewMode, setPreviewMode] = useState<'card' | 'detail'>('card');
  const [previewData, setPreviewData] = useState<PreviewData>({
    collectionNumber: nextNumber,
    title: '',
    price: 0,
    category: 'Hot Wheels',
    condition: 'Mint',
    badge: '',
    tags: [],
    description: '',
    featured: false,
    coverUrl: null,
    status: 'Available',
  });

  const currentCollectionNumber = 
    selectedNumberOption === 'next' ? nextNumber :
    selectedNumberOption === 'previous' && previousNumber ? previousNumber :
    customNumber;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'tags') {
      setPreviewData(prev => ({ ...prev, tags: value.split(',').map(t => t.trim()).filter(Boolean) }));
    } else if (name === 'price') {
      setPreviewData(prev => ({ ...prev, price: parseInt(value || '0', 10) }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPreviewData(prev => ({ ...prev, [name]: checked }));
    } else {
      setPreviewData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewData(prev => ({ ...prev, coverUrl: url }));
    } else {
      setPreviewData(prev => ({ ...prev, coverUrl: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set('collectionNumber', currentCollectionNumber);

    // Tags processing: split by comma and trim
    const tagsStr = formData.get('tags') as string;
    const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : [];
    formData.set('tags', JSON.stringify(tags));

    // Featured processing
    formData.set('featured', formData.get('featured') ? 'true' : 'false');

    try {
      const res = await fetch('/api/admin/catalog/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload catalog');
      }

      setSuccess(`Katalog ${currentCollectionNumber} berhasil diunggah! Mengalihkan ke halaman Manage...`);
      form.reset();
      
      // Redirect to manage page after 2 seconds so they can see the item (after build)
      setTimeout(() => {
        router.push('/rcpanel7x/manage');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mx-auto px-4 py-6 lg:px-8 space-y-8 transition-all duration-300 ${previewMode === 'detail' ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
      <Link href="/rcpanel7x" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold transition">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className={`grid grid-cols-1 gap-8 transition-all duration-300 ${previewMode === 'detail' ? 'xl:grid-cols-[450px_1fr]' : 'xl:grid-cols-2'}`}>
        {/* Form Section */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 h-fit">
          <h1 className="font-serif text-2xl font-semibold text-parchment-100">Upload New Catalog</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Tambahkan item koleksi baru ke dalam repositori secara langsung via GitHub API.
          </p>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-950/50 border border-red-900 text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-950/50 border border-emerald-900 text-emerald-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* Auto Numbering Options */}
            <div className="space-y-3 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
              <label className="text-sm font-medium text-zinc-300">Available Numbers</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedNumberOption === 'next' ? 'border-gold bg-gold/10' : 'border-zinc-800 hover:border-zinc-600'}`}>
                  <input 
                    type="radio" 
                    name="numberOption" 
                    checked={selectedNumberOption === 'next'}
                    onChange={() => {
                      setSelectedNumberOption('next');
                      setPreviewData(prev => ({ ...prev, collectionNumber: nextNumber }));
                    }}
                    className="accent-gold"
                  />
                  <div>
                    <p className="text-sm font-medium text-parchment-100">{nextNumber}</p>
                    <p className="text-xs text-zinc-500">Next Number</p>
                  </div>
                </label>
                
                {previousNumber && (
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedNumberOption === 'previous' ? 'border-gold bg-gold/10' : 'border-zinc-800 hover:border-zinc-600'}`}>
                    <input 
                      type="radio" 
                      name="numberOption" 
                      checked={selectedNumberOption === 'previous'}
                      onChange={() => {
                        setSelectedNumberOption('previous');
                        setPreviewData(prev => ({ ...prev, collectionNumber: previousNumber }));
                      }}
                      className="accent-gold"
                    />
                    <div>
                      <p className="text-sm font-medium text-parchment-100">{previousNumber}</p>
                      <p className="text-xs text-zinc-500">Available Gap</p>
                    </div>
                  </label>
                )}

                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedNumberOption === 'custom' ? 'border-gold bg-gold/10' : 'border-zinc-800 hover:border-zinc-600'}`}>
                  <input 
                    type="radio" 
                    name="numberOption" 
                    checked={selectedNumberOption === 'custom'}
                    onChange={() => setSelectedNumberOption('custom')}
                    className="accent-gold"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 mb-1">Custom</p>
                    <input 
                      type="text"
                      placeholder="e.g. RC-040"
                      value={customNumber}
                      onChange={(e) => {
                        setCustomNumber(e.target.value);
                        setPreviewData(prev => ({ ...prev, collectionNumber: e.target.value }));
                      }}
                      onFocus={() => {
                        setSelectedNumberOption('custom');
                        setPreviewData(prev => ({ ...prev, collectionNumber: customNumber }));
                      }}
                      className="w-full bg-transparent text-sm text-parchment-100 placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Title</label>
                <input required name="title" type="text" onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Price (IDR)</label>
                <input required name="price" type="number" min="0" onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <select required name="category" onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none">
                  <option value="Hot Wheels">Hot Wheels</option>
                  <option value="Komik">Komik</option>
                  <option value="Uang Kuno & Perangko">Uang Kuno & Perangko</option>
                  <option value="PlayStation">PlayStation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Condition</label>
                <select required name="condition" onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none">
                  <option value="Mint">Mint (M)</option>
                  <option value="Near Mint">Near Mint (NM)</option>
                  <option value="Excellent">Excellent (EX)</option>
                  <option value="Good">Good (VG / G)</option>
                  <option value="Fair">Fair / Poor</option>
                  <option value="Loose">Loose (No Box)</option>
                  <option value="Sealed">Brand New In Box (BNIB) / Sealed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Badge (Optional)</label>
                <select name="badge" onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none">
                  <option value="">-- No Badge --</option>
                  <option value="Rare Find">Rare Find</option>
                  <option value="Featured">Featured</option>
                  <option value="Limited">Limited</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Restocked">Restocked</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Best Seller">Best Seller</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Tags (Comma separated)</label>
                <input name="tags" type="text" onChange={handleInputChange} placeholder="e.g. Vintage, Original" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none" />
              </div>

              <div className="space-y-2 flex flex-col justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input name="featured" type="checkbox" onChange={handleInputChange} className="w-4 h-4 accent-gold" />
                  <span className="text-sm font-medium text-zinc-300">Featured Item</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Description</label>
              <textarea required name="description" rows={4} onChange={handleInputChange} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-parchment-100 focus:border-gold focus:outline-none resize-none"></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Cover Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-800 border-dashed rounded-lg cursor-pointer bg-zinc-950/50 hover:bg-zinc-800/50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-zinc-400" />
                    <p className="mb-2 text-sm text-zinc-400"><span className="font-semibold text-gold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-zinc-500">PNG, JPG or WebP (Max 3MB)</p>
                  </div>
                  <input required name="cover" type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {loading ? 'Pushing to GitHub...' : 'Upload & Commit'}
            </button>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 h-fit sticky top-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-semibold text-parchment-100">Live Preview</h2>
            <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
              <button 
                onClick={() => setPreviewMode('card')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${previewMode === 'card' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Card View
              </button>
              <button 
                onClick={() => setPreviewMode('detail')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${previewMode === 'detail' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Detail View
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <AdminPreview data={previewData} mode={previewMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
