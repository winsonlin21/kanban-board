"use client"

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
  // Board states
  const [boards, setBoards] = useState<{ boardId: number; boardName: string }[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleAddBoard = () => {
    setShowModal(true);
    setNewBoardName("");
  };

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    const newId = boards.length > 0 ? Math.max(...boards.map(b => b.boardId)) + 1 : 1;
    const newBoard = { boardId: newId, boardName: newBoardName.trim() };
    setBoards([...boards, newBoard]);
    setSelectedBoardId(newId);
    setShowModal(false);
    setNewBoardName("");
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewBoardName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Toolbar */}
      <header className="w-full h-14 bg-[#232946] text-white flex items-center px-6 shadow z-10">
        <h1 className="text-lg font-bold tracking-wide">Kanban App</h1>
      </header>

      {/*` Main Content Area */}
      <div className="flex flex-1 min-h-0">

        {/* Left Sidebar for Boards */}
        <aside className="w-20 bg-[#181c2a] text-white flex flex-col items-center py-6 border-r border-[#232946]">
          <div className="mb-4 font-semibold text-xs">Boards</div>
          {boards.map((board) => (
            <Button
              key={board.boardId}
              className={`w-10 h-10 mb-2 rounded flex items-center justify-center font-bold transition-colors ${
                board.boardId === selectedBoardId
                  ? "bg-[#fff] text-[#232946] border-2 border-[#232946] hover:bg-[#f0f0f0]"
                  : "bg-[#232946] text-white hover:bg-[#2d3250]"
              }`}
              onClick={() => setSelectedBoardId(board.boardId)}>
              {board.boardName[0]}
            </Button>
          ))}
          <Button
            className="w-10 h-10 mb-2 rounded flex items-center justify-center font-bold transition-colors hover:bg-[#2d3250]"
            onClick={handleAddBoard}
            aria-label="Add board">
            +
          </Button>
        </aside>


        {/* Main Kanban Board Area */}
        <main className="flex-1 bg-[#22243a] p-8 overflow-x-auto">
          {selectedBoardId ? (
            <div className="text-white text-2xl font-semibold mb-6">
              {boards.find(b => b.boardId === selectedBoardId)?.boardName}
            </div>
          ) : (
            <div className="text-white text-xl font-semibold mb-6 opacity-60">
              No board selected. Create a board to get started!
            </div>
          )}
          {/* Placeholder for Kanban board content */}
        </main>

      </div>


      {/* Input Name Prompt*/}
      {showModal && ( 
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
    </div>
  );
}