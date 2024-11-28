'use client'

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}: TablePaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
      <div>
        Showing {currentPage} to {totalPages} of {totalPages} entries
      </div>
      <div className="flex gap-2">
        <button 
          className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-100' : 'bg-purple-600 text-white'}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === index + 1 ? 'bg-purple-600 text-white' : ''
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-100' : 'bg-purple-600 text-white'}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}