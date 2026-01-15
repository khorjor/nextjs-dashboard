import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredCustomers, fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

const ITEMS_PER_PAGE = 6;

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch all filtered customers to calculate total pages
  const allCustomers = await fetchFilteredCustomers(query);
  const totalPages = Math.ceil(allCustomers.length / ITEMS_PER_PAGE);

  // Get customers for current page
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = allCustomers.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={paginatedCustomers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}