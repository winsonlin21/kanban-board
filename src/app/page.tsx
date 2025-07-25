"use client"

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"

type Board = { 
  boardId: number; 
  boardName: string;
  columns?: Column[];
};

type Column = {
  columnId: number;
  columnName: string;
  boardId: number;
  tasks?: Task[];
}

type Task = {
  taskId: number;
  taskName: string;
  columnId: number;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "done";
}

export default function Home() {
  // Board states
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  // Modal states
  const [showAddBoardConfirmation, setshowAddBoardConfirmation] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const [showDeleteBoardConfirmation, setshowDeleteBoardConfirmation] = useState(false);
  const [boardIdToDelete, setBoardIdToDelete] = useState<number | null>(null);

  // Handlers for delete confirmation modal
  function handleConfirmDeleteBoard() {
    if (boardIdToDelete !== null) {
      setBoards(prev => prev.filter(b => b.boardId !== boardIdToDelete));
      if (selectedBoardId === boardIdToDelete) setSelectedBoardId(null);
    }
    setshowDeleteBoardConfirmation(false);
    setBoardIdToDelete(null);
  }

  function handleCancelDeleteBoard() {
    setshowDeleteBoardConfirmation(false);
    setBoardIdToDelete(null);
  }



  const handleAddBoard = () => {
    setshowAddBoardConfirmation(true);
    setNewBoardName("");
  };

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    const newId = boards.length > 0 ? Math.max(...boards.map(b => b.boardId)) + 1 : 1;
    const newBoard = { boardId: newId, boardName: newBoardName.trim(), columns: [] };
    setBoards([...boards, newBoard]);
    setSelectedBoardId(newId);
    setshowAddBoardConfirmation(false);
    setNewBoardName("");
  };

  const handleCancel = () => {
    setshowAddBoardConfirmation(false);
    setNewBoardName("");
  };

  function handleDeleteBoard(boardId: number) {
    setBoardIdToDelete(boardId);
    setshowDeleteBoardConfirmation(true);
  }

  const selectedBoard = boards.find(b => b.boardId === selectedBoardId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Toolbar */}
      <header className="w-full h-14 bg-[#232946] text-white flex items-center px-6 shadow z-10">
        <h1 className="text-lg font-bold tracking-wide">Kanban App</h1>
      </header>

      {/*` Main Content Area */}
      <div className="flex flex-1 min-h-0">

        {/* Left Sidebar for Boards */}
        <aside className="w-[250px] bg-[#181c2a] text-white flex flex-col items-center py-6 border-r border-[#232946]">
          <div className="mb-4 font-semibold text-xs text-[20px]">Boards</div>
          {boards.map((board) => (
            <Button
              key={board.boardId}
              className={`w-[200px] h-10 mb-2 rounded flex items-center justify-center font-bold transition-colors ${
                board.boardId === selectedBoardId
                  ? "bg-[#fff] text-[#232946] border-2 border-[#232946] hover:bg-[#f0f0f0]"
                  : "bg-[#232946] text-white hover:bg-[#2d3250]"
              }`}
              onClick={() => setSelectedBoardId(board.boardId)}
              onContextMenu={e => {
                e.preventDefault();
                handleDeleteBoard(board.boardId);
              }}
            >
              {board.boardName}
            </Button>
          ))}
          <Button
            className="w-[200] h-10 mb-2 rounded flex items-center justify-center font-bold transition-colors hover:bg-[#2d3250]"
            onClick={handleAddBoard}
            aria-label="Add board">
            +
          </Button>
        </aside>


        {/* Main Kanban Board Area */}
        <main className="flex-1 bg-[#22243a] p-8 overflow-x-auto">
          {selectedBoard ? (
            <div className="text-white text-2xl font-semibold mb-6">
              {selectedBoard.boardName}
            </div>
            

          ) : 
          (
            <div className="text-white text-xl font-semibold mb-6 opacity-60">
              No board selected. Create a board to get started!
            </div>
          )}
        </main>

      </div>


      {/* Input Name Prompt*/}
      {showAddBoardConfirmation && ( 
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#232946] p-6 rounded shadow-lg w-80 flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-4">Create New Board</h2>
            <input
              className="w-full mb-4 px-3 py-2 rounded bg-[#181c2a] text-white border border-[#232946] focus:outline-none"
              placeholder="Board name"
              value={newBoardName}
              onChange={e => setNewBoardName(e.target.value)}
              autoFocus
              onKeyDown={e => {
                if (e.key === "Enter") handleCreateBoard();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <div className="flex gap-2 w-full">
              <Button className="flex-1" onClick={handleCreateBoard} disabled={!newBoardName.trim()}>
                Create
              </Button>
              <Button className="flex-1" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteBoardConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#232946] p-6 rounded shadow-lg w-80 flex flex-col items-center">
            <h2 className="text-white text-lg font-bold mb-4">Delete Board</h2>
            <p className="text-white mb-6">Are you sure you want to delete this board?</p>
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1"
                variant="destructive"
                onClick={handleConfirmDeleteBoard}
              >
                Yes
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleCancelDeleteBoard}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}