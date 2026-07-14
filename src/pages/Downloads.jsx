import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Breadcrumbs, EmptyState } from '../components/UI/Shared';

const Downloads = () => {
  const downloads = db.getDownloads();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Extract unique document types
  const docTypes = [];
  downloads.forEach(d => {
    if (d.type && !docTypes.includes(d.type)) {
      docTypes.push(d.type);
    }
  });

  const filteredDocs = downloads.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (doc) => {
    alert(`Downloading "${doc.title}"... \nFile Size: ${doc.size}\nFormat: PDF Document`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Downloads Center" }]} />

      {/* Header */}
      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-dark">Downloads Center</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Access our official company profile, product catalog, veterinary brochures, and quality certifications.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-50 border p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search document name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm text-neutral-dark bg-white border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Icons.Search className="w-4 h-4 text-neutral-muted absolute left-3 top-3.5" />
        </div>

        {/* Types */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            onClick={() => setSelectedType('')}
            className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
              selectedType === ''
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white text-neutral-body border-neutral-border hover:bg-neutral-light'
            }`}
          >
            All Documents
          </button>
          {docTypes.map((type, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
                selectedType === type
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-neutral-body border-neutral-border hover:bg-neutral-light'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Downloads Table */}
      {filteredDocs.length > 0 ? (
        <div className="bg-white border border-neutral-border rounded-xl shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-light text-neutral-dark border-b border-neutral-border font-bold">
                  <th className="px-6 py-4">Document Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">File Size</th>
                  <th className="px-6 py-4">Release Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-neutral-dark flex items-center gap-3">
                      <Icons.FileText className="w-5 h-5 text-primary flex-shrink-0" />
                      {doc.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 text-2xs font-semibold text-primary bg-primary-light border border-primary/20 rounded uppercase">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">{doc.size}</td>
                    <td className="px-6 py-4 text-xs">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover active:bg-primary-dark rounded transition-colors shadow-2xs"
                      >
                        <Icons.Download className="w-3.5 h-3.5" /> Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Documents Found"
          description="There are no brochures or certificates matching your query. Please adjust your keywords."
          actionText="Clear Filters"
          onAction={() => { setSearchTerm(''); setSelectedType(''); }}
        />
      )}

    </div>
  );
};

export default Downloads;
