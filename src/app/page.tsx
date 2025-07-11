// src/app/boards/page.tsx
'use client'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const GET_BOARDS = gql`
  query GetBoards {
    boards {
      id
      name
      description
      created_at
      updated_at
    }
  }
`

export default function BoardsPage() {
  const { loading, error, data } = useQuery(GET_BOARDS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button>
          <Link href="/boards/new">Create New Board</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.boards?.map((board: any) => (
          <div key={board.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">{board.name}</h2>
            {board.description && (
              <p className="text-sm text-gray-600 mb-2">{board.description}</p>
            )}
            <p className="text-sm text-gray-600 mb-4">
              Created: {new Date(board.created_at).toLocaleDateString()}
            </p>
            <Link href={`/boards/${board.id}`}>
              <Button variant="outline" size="sm">
                Open Board
              </Button>
            </Link>
          </div>
        ))}
      </div>
      
      {data?.boards?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No boards yet</p>
          <Button>
            <Link href="/boards/new">Create Your First Board</Link>
          </Button>
        </div>
      )}
    </div>
  )
}