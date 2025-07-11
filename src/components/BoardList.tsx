'use client'
import { useQuery, gql } from '@apollo/client'
import { useAuthenticationStatus } from '@nhost/react'

const GET_BOARDS = gql`
  query GetBoards {
    boards {
      id
      name
      description
      created_at
    }
  }
`

export default function BoardList() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const { data, loading, error } = useQuery(GET_BOARDS, {
    skip: !isAuthenticated // Only run query if authenticated
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading authentication...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Kanban Board</h1>
          <p className="text-gray-600">Please log in to view your boards</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading boards...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Boards</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Boards</h1>
        <p className="text-gray-600">Manage your kanban boards</p>
      </div>

      {data?.boards?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No boards yet</h2>
          <p className="text-gray-600 mb-6">Create your first board to get started!</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
            Create Board
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.boards?.map((board: any) => (
            <div key={board.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{board.name}</h3>
              {board.description && (
                <p className="text-gray-600 mb-4">{board.description}</p>
              )}
              <div className="flex justify-between items-center">
                <small className="text-gray-500">
                  Created: {new Date(board.created_at).toLocaleDateString()}
                </small>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}