  "use client";

import { useEffect, useState } from "react";
interface UploadBoxProps {
  service: string;
}

export default function UploadBox({ service }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState<number>(50);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/ping`).then((res) => {
      console.log(res, ":::::::::::::::::::::response")
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  async function fileConversion() {
    if (!file) return;
    setLoading(true);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("service", service);
      formData.append("fileName", file.name);
      formData.append('quality', quality.toString());
    

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/convert/${service}`, {
        method: "POST",
        body: formData,
      });

      console.log(res, '::::::::::::::::::::::::::::::::::')
      if (!res.ok) throw new Error("Conversion failed");


      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);

    } catch (err) {
      console.log(err);
      alert("Conversion failed");
    }

    setLoading(false);
  }


  function checkNumber(e: React.ChangeEvent<HTMLInputElement>){
    const value=e.target.value;
    if (!isNaN(Number(value))) {
    setQuality(Number(e.target.value))
    };
  }
  function fileUpload(e: React.ChangeEvent<HTMLInputElement>) {
     setFile(()=>{
      setDownloadUrl(null)
      return e.target.files?.[0] || null
    })
  }
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 text-center">

      <h2 className="text-2xl font-semibold mb-2">
        Upload your file
      </h2>

      <p className="text-slate-500 mb-6">
        Fast, secure and privacy-friendly
      </p>

      <label className="border-2 border-dashed rounded-xl p-12 block cursor-pointer hover:border-blue-500 transition">

        <input
          type="file"
          hidden
          onChange={(e) =>fileUpload(e)}
        />

        <p className="text-slate-500">
          Click to upload
        </p>

        {file && (
          <p className="mt-4 text-blue-600 text-sm">
            {file.name}
          </p>
        )}

      </label>

{service==='image-compressor' && 
     <div className="mt-6 text-sm text-right">
      <label className="block mb-2 font-medium text-slate-600">
        Compression Quality
      </label>
      <div className="flex items-center justify-end gap-2">
        <input
          type="text"
          maxLength={100}
          value={quality}
          onChange={(e) => checkNumber(e)}
          className="w-20 px-2 py-1 border rounded-md"
        />
        <span>%</span>
      </div>
    </div>
}
      {/* Convert Button */}
      {!downloadUrl && (
        <button
          disabled={!file || loading}
          onClick={fileConversion}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-40"
        >
          {loading ? "Converting..." : "Convert Now"}
        </button>
      )}

      {/* Download Button */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download=''
          className="block mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Download File
        </a>
      )}

      <p className="text-xs text-slate-400 mt-4">
        Files auto deleted after conversion
      </p>
    </div>
  );
}
