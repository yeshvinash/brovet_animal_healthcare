import React, { useMemo, useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { EmptyState } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Badge } from '../components/UI/Badge';
import { DataTable } from '../components/UI/DataTable';
import { Button } from '../components/UI/Button';

const Downloads = () => {
  const downloads = db.getDownloads();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const docTypes = [];
  downloads.forEach((d) => {
    if (d.type && !docTypes.includes(d.type)) {
      docTypes.push(d.type);
    }
  });

  const filteredDocs = downloads.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (doc) => {
    alert(`Downloading "${doc.title}"... \nFile Size: ${doc.size}\nFormat: PDF Document`);
  };

  const columns = useMemo(
    () => [
      {
        id: 'title',
        header: 'Document Title',
        sortable: true,
        cell: (doc) => (
          <span className="inline-flex items-center gap-3 font-semibold text-neutral-dark">
            <Icons.FileText className="h-5 w-5 shrink-0 text-primary" />
            {doc.title}
          </span>
        ),
      },
      {
        id: 'type',
        header: 'Type',
        sortable: true,
        accessorKey: 'type',
        cell: (doc) => (
          <Badge variant="soft" className="px-2.5 text-2xs">
            {doc.type}
          </Badge>
        ),
      },
      {
        id: 'size',
        header: 'File Size',
        accessorKey: 'size',
        className: 'text-xs font-medium',
      },
      {
        id: 'date',
        header: 'Release Date',
        sortable: true,
        accessorKey: 'date',
        className: 'text-xs',
      },
      {
        id: 'action',
        header: 'Action',
        headerClassName: 'text-right',
        className: 'text-right',
        cell: (doc) => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleDownload(doc)}
            icon={<Icons.Download className="h-3.5 w-3.5" />}
          >
            Download PDF
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Downloads Center' }]} />

      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Downloads Center</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Access our official company profile, product catalog, veterinary brochures, and quality certifications.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-50 border p-4 rounded-xl">
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

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            type="button"
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
              type="button"
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

      {filteredDocs.length > 0 ? (
        <div className="bg-white border border-neutral-border rounded-xl shadow-premium overflow-hidden">
          <DataTable columns={columns} data={filteredDocs} emptyMessage="No documents found." />
        </div>
      ) : (
        <EmptyState
          title="No Documents Found"
          description="There are no brochures or certificates matching your query. Please adjust your keywords."
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedType('');
          }}
        />
      )}
    </div>
  );
};

export default Downloads;
