"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ArrowLeft, Zap, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [botName, setBotName] = useState("")
  const [botType, setBotType] = useState("")
  const [description, setDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !botName || !botType) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Upload Bot</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Deploy Your Bot</CardTitle>
            <CardDescription>Upload your bot files and get it running in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bot Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="botName">Bot Name</Label>
                <Input
                  id="botName"
                  placeholder="My Awesome Bot"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="botType">Bot Type</Label>
                <Select value={botType} onValueChange={setBotType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bot type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discord">Discord Bot</SelectItem>
                    <SelectItem value="telegram">Telegram Bot</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp Bot</SelectItem>
                    <SelectItem value="web">Web Application</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your bot..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <Label>Upload Files</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-2">
                    <FileText className="w-12 h-12 text-primary mx-auto" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Drop your ZIP file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".zip,.tar.gz"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading and deploying...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {/* Success Message */}
            {uploadProgress === 100 && !uploading && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Bot deployed successfully!</span>
              </div>
            )}

            {/* Deploy Button */}
            <Button className="w-full" onClick={handleUpload} disabled={!file || !botName || !botType || uploading}>
              {uploading ? "Deploying..." : "Deploy Bot"}
            </Button>

            {/* Requirements */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Requirements:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• ZIP file containing your bot code</li>
                    <li>• package.json for Node.js bots</li>
                    <li>• requirements.txt for Python bots</li>
                    <li>• Maximum file size: 100MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
