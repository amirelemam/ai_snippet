"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import { PlusIcon, EyeIcon } from 'lucide-react'

interface Snippet {
  _id: string
  text: string
  summary: string
  createdAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false)
  const [newSnippetText, setNewSnippetText] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const fetchSnippets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/snippets`)
      const data = await response.json()
      setSnippets(data)
    } catch (error) {
      console.error('Failed to fetch snippets:', error)
    }
  }

  const createSnippet = async () => {
    try {
      setIsCreating(true)
      const response = await fetch(`${API_BASE_URL}/api/snippets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newSnippetText }),
      })

      if (!response.ok) {
        throw new Error('Failed to create snippet')
      }

      await fetchSnippets()
      setIsCreateModalOpen(false)
      setNewSnippetText('')
    } catch (error) {
      console.error('Error creating snippet:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateModalClose = () => {
    if (newSnippetText.trim()) {
      setIsDiscardConfirmOpen(true)
    } else {
      setIsCreateModalOpen(false)
    }
  }

  const handleViewSnippet = (snippet: Snippet) => {
    setSelectedSnippet(snippet)
    setIsViewModalOpen(true)
  }

  useEffect(() => {
    fetchSnippets()
  }, [])

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-gray-800">
          AI <span className="font-bold text-blue-600">Snippet</span>
        </h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="default"
          size="default"
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          New Snippet
        </Button>
      </div>

      {/* Snippets List */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-100 overflow-x-auto">
        {snippets.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-6">
                <PlusIcon className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <p className="text-xl text-gray-700">No snippets yet</p>
            <p className="text-gray-500">Click &quot;New Snippet&quot; to get started</p>
          </div>
        ) : (
          <div className="min-w-full">
            {snippets.map((snippet) => (
              <div
                key={snippet._id}
                className="
                  flex items-center justify-between 
                  px-6 py-4 
                  hover:bg-gray-50 
                  transition-colors duration-200
                  border-b border-gray-100
                  last:border-b-0
                "
              >
                <div className="flex-grow pr-4 min-w-0 w-full">
                  <h3 className="
                    text-gray-800 
                    font-medium 
                    break-words 
                    whitespace-normal 
                    max-w-full
                  ">
                    {snippet.summary || 'Untitled Snippet'}
                  </h3>
                  <p className="
                    text-sm 
                    text-gray-500 
                    break-words 
                    whitespace-normal 
                    max-w-full
                  ">
                    {formatDate(snippet.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewSnippet(snippet)}
                    className="whitespace-nowrap"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Snippet Modal */}
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      >
        <DialogHeader>Create New Snippet</DialogHeader>
        <DialogContent>
          <Textarea
            placeholder="Enter your snippet text here..."
            value={newSnippetText}
            onChange={(e) => setNewSnippetText(e.target.value)}
            className="
              min-h-[200px] 
              border-gray-200 
              bg-gray-50
              rounded-lg
              focus:border-blue-500 
              focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            "
            required
          />
        </DialogContent>
        <DialogFooter>
          <DialogClose
            onClose={handleCreateModalClose}
            className="mr-2 self-end"
            disabled={isCreating}
          >
            <Button
              variant="cancel"
              size="default"
              disabled={isCreating}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={createSnippet}
            variant="default"
            isLoading={isCreating}
            disabled={!newSnippetText.trim()}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Discard Confirmation Modal */}
      <Dialog
        open={isDiscardConfirmOpen}
        onOpenChange={setIsDiscardConfirmOpen}
      >
        <DialogHeader>Discard Changes?</DialogHeader>
        <DialogContent>
          Are you sure you want to discard your unsaved changes?
        </DialogContent>
        <DialogFooter>
          <DialogClose
            onClose={() => setIsDiscardConfirmOpen(false)}
            className="mr-2 self-end"
            disabled={isCreating}
          >
            <Button
              variant="cancel"
              size="default"
              disabled={isCreating}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              setIsCreateModalOpen(false)
              setIsDiscardConfirmOpen(false)
              setNewSnippetText('')
            }}
            disabled={isCreating}
          >
            Discard
          </Button>
        </DialogFooter>
      </Dialog>

      {/* View Snippet Modal */}
      <Dialog
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      >
        <DialogHeader>Snippet Details</DialogHeader>
        <DialogContent>
          {selectedSnippet && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Text</p>
                <div className="
                  bg-gray-50 
                  p-4 
                  rounded-lg 
                  border border-gray-200 
                  max-h-[300px] 
                  overflow-y-auto
                  break-words
                  whitespace-pre-wrap
                  text-sm
                  text-gray-800
                  font-mono
                ">
                  {selectedSnippet.text}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Summary</p>
                <p className="
                  bg-gray-50 
                  p-4 
                  rounded-lg 
                  border border-gray-200
                  text-gray-800
                ">
                  {selectedSnippet.summary || 'No summary provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Created At</p>
                <p className="
                  bg-gray-50 
                  p-4 
                  rounded-lg 
                  border border-gray-200
                  text-gray-800
                ">
                  {formatDate(selectedSnippet.createdAt)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <DialogClose
            onClose={() => setIsViewModalOpen(false)}
            className="mr-2 self-end"
          >
            <Button
              variant="cancel"
              size="default"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </Dialog>
    </div>
  )
} 