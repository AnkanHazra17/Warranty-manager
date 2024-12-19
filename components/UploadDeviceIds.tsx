import React from "react";
import * as XLSX from "xlsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface UploadDeviceIdsProps {
  type: "xlsx" | "manual";
  deviceIds: string[];
  setDeviceIds: (deviceIds: string[]) => void;
}

function UploadDeviceIds({
  type,
  deviceIds,
  setDeviceIds,
}: UploadDeviceIdsProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [deviceId, setDeviceId] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const processWorkBook = (workBook: XLSX.WorkBook) => {
    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Array<Record<string, any>> = XLSX.utils.sheet_to_json(sheet);
    const ids = data.map((row) => row["deviceId"]).filter(Boolean) as string[];
    setDeviceIds(ids);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (file.name.endsWith(".csv")) {
          const text = event.target?.result as string;
          const workBook = XLSX.read(text, { type: "string" });
          processWorkBook(workBook);
        } else {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const workBook = XLSX.read(arrayBuffer, { type: "binary" });
          processWorkBook(workBook);
        }
      };

      if (file.name.endsWith(".csv")) {
        reader.readAsText(file); // Read CSV as text
      } else {
        reader.readAsArrayBuffer(file); // Read Excel as binary
      }
    }
  };

  const handleDeleteDeviceId = (index: number) => {
    const newDeviceIds = [...deviceIds];
    newDeviceIds.splice(index, 1);
    setDeviceIds(newDeviceIds);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const id = deviceId?.trim();
      if (id !== "") {
        if (id?.startsWith("WhizPad_RC-")) {
          const newDeviceIds = [...deviceIds, id];
          setDeviceIds(newDeviceIds);
        } else {
          const formatedId = `WhizPad_RC-${id}`;
          const newDeviceIds = [...deviceIds, formatedId];
          setDeviceIds(newDeviceIds);
        }
        setDeviceId("");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-1">
        <Label className="leading-normal">
          {type === "xlsx"
            ? "Provide Device ID by uploading excel sheet"
            : "Type Device IDs manually"}
        </Label>
        {deviceIds.length > 0 && (
          <ScrollArea className="h-[300px] my-5">
            <div className="w-full flex gap-2 flex-wrap">
              {deviceIds.map((deviceId, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-xl bg-secondary"
                >
                  <p className="text-xs">{deviceId}</p>
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleDeleteDeviceId(index)}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {type === "xlsx" ? (
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".xlsx, .xls, .csv"
              placeholder="Upload excel sheet"
              onChange={handleFileChange}
            ></Input>
            <Button
              disabled={!file || deviceIds.length > 0}
              type="button"
              onClick={handleFileUpload}
            >
              Extract
            </Button>
          </div>
        ) : (
          <Input
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Type device id"
          ></Input>
        )}
      </div>
    </div>
  );
}

export default UploadDeviceIds;
