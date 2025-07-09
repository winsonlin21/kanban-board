'use client';

import { useGetCountriesQuery } from '@/graphql/generated/graphql';

export default function CountriesPage() {
  const { data, loading, error } = useGetCountriesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.countries.map((country) => (
        <li key={country.code}>{country.name}</li>
      ))}
    </ul>
  );
}
