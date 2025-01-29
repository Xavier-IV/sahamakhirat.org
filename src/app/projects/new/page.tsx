"use client"

import { useState } from "react"
import { Header } from "../../components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useDropzone } from "react-dropzone"

export default function NewProject() {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectWebsite, setProjectWebsite] = useState("")
  const [intentionChecked, setIntentionChecked] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0])
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!intentionChecked) {
      alert("Please confirm your intention before submitting.")
      return
    }
    // TODO: Implement project submission logic
    console.log("Submitting project:", { projectName, projectDescription, projectWebsite, image })
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
              Project Description
            </label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="projectWebsite" className="block text-sm font-medium text-gray-700">
              Project Website
            </label>
            <Input
              id="projectWebsite"
              value={projectWebsite}
              onChange={(e) => setProjectWebsite(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700">
              Project Image
            </label>
            <div
              {...getRootProps()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input {...getInputProps()} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {image && <p className="mt-2 text-sm text-gray-500">Selected file: {image.name}</p>}
          </div>
          <div className="flex items-center">
            <Checkbox
              id="intention"
              checked={intentionChecked}
              onCheckedChange={(checked) => setIntentionChecked(checked as boolean)}
            />
            <label htmlFor="intention" className="ml-2 block text-sm text-gray-900">
              I confirm my intention to contribute to this project for the sake of Allah and to earn rewards in the
              Akhirah.
            </label>
          </div>
          <Button type="submit" disabled={!intentionChecked}>
            Submit Project
          </Button>
        </form>
      </main>
    </>
  )
}

