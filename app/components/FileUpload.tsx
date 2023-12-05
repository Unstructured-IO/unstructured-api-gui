import type { FC} from 'react';
import { useState } from 'react'
import { DocumentIcon } from '@heroicons/react/20/solid'

const FileUpload: FC = () => {
    const [fileInputText, setFileInputText] = useState<string>('Select a file to upload')
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

    const handleFileChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const { files } = e.currentTarget
        if (files) {
          setSelectedFiles(Array.from(files))
          setFileInputText('Select different files')
        }
      }

    return ( 
        <div className="flex justify-center rounded-lg border border-solid border-gray-900/25 px-6 py-5">
        <div className="text-center w-full">
          <div className="text-sm leading-6 text-gray-600">
              { selectedFiles.length > 0 && 
                <div>
                    <p className='font-medium test-md text-left'>Selected files</p>
                    <ul>
                    {                                  
                        selectedFiles.map(({name, size}) => {
                        return (
                            <li key={name} className="flex items-center p-1 my-2 justify-between border border-dashed w-full border-gray-900/25">
                            <div className="flex w-0 flex-1 items-center">
                            <DocumentIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">{name}</span>
                                <span className="flex-shrink-0 text-gray-400">{ (size / 1000000).toFixed(2)}mb</span>
                            </div>
                            </div>
                            </li>
                        )
                        })
                    }
                    </ul> 
                </div>
                }
                <div className="text-center">
                  <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-darkest-slate-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-dark-blue focus-within:ring-offset-2 hover:text-dark-slate-blue hover:underline"
                    >
                      <span>{fileInputText}</span>
                      <input required id="file-upload" name="files" type="file" multiple className="sr-only"  onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
          </div>
        </div>
      </div>
    )
}

export { FileUpload }