import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProcessedDocument {
  id: string;
  name: string;
  status: "processing" | "completed" | "failed";
  ppn0620Compliance: boolean;
  keyRequirements: string[];
  extractedDeadlines: string[];
}

export default function DocumentProcessor() {
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      const newDoc: ProcessedDocument = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        status: "processing",
        ppn0620Compliance: false,
        keyRequirements: [],
        extractedDeadlines: [],
      };

      setDocuments((prev) => [newDoc, ...prev]);

      // Simulate AI processing
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === newDoc.id
              ? {
                  ...doc,
                  status: "completed",
                  ppn0620Compliance: Math.random() > 0.3,
                  keyRequirements: [
                    "Modern Slavery Act 2015 compliance statement required",
                    "ISO 27001 certification or equivalent",
                    "Carbon reduction plan (PPN 06/21)",
                    "Payment terms: 30 days from invoice",
                    "Insurance: £5M professional indemnity",
                  ],
                  extractedDeadlines: [
                    "Tender submission: 15th April 2026, 12:00 GMT",
                    "Clarification questions: 1st April 2026, 17:00 GMT",
                    "Site visit registration: 25th March 2026",
                  ],
                }
              : doc
          )
        );
      }, 3000);
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Doccute</span> Document Processor
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered tender document analysis with zero-hallucination guarantees
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Tender Documents</CardTitle>
            <CardDescription>
              Drag and drop PDF files or click to browse. Maximum file size: 100MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                isDragging
                  ? "border-neon-green bg-neon-green/10 card-glow"
                  : "border-border/50 hover:border-neon-green/50"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileInput}
                accept=".pdf"
                multiple
              />
              <Upload
                className={`w-16 h-16 mx-auto mb-4 ${isDragging ? "text-neon-green animate-pulse-glow" : "text-muted-foreground"}`}
              />
              <h3 className="text-xl font-semibold mb-2">
                {isDragging ? "Drop files here" : "Drop tender documents here"}
              </h3>
              <p className="text-muted-foreground mb-4">or click to browse from your computer</p>
              <Button className="bg-neon-green hover:bg-neon-glow text-background">
                Select PDF Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processed Documents */}
        {documents.length > 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Processing Queue</CardTitle>
              <CardDescription>AI extraction and compliance analysis in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <FileText className="w-5 h-5 text-neon-green mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{doc.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            {doc.status === "processing" && (
                              <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Processing with Doccute AI
                              </Badge>
                            )}
                            {doc.status === "completed" && (
                              <>
                                <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                                {doc.ppn0620Compliance ? (
                                  <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                                    PPN 06/20 Compliant
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="border-orange-500/30 text-orange-500">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Review Required
                                  </Badge>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {doc.status === "completed" && (
                      <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border/50">
                        <div>
                          <h5 className="font-semibold text-neon-green mb-3 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Key Compliance Requirements
                          </h5>
                          <ul className="space-y-2">
                            {doc.keyRequirements.map((req, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-neon-green mr-2">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-neon-green mb-3 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Critical Deadlines Extracted
                          </h5>
                          <ul className="space-y-2">
                            {doc.extractedDeadlines.map((deadline, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-neon-green mr-2">•</span>
                                <span>{deadline}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
