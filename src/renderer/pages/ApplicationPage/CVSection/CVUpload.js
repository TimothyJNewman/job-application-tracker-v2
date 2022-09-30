import React, { useContext } from "react"
import { FilePicker } from "../../../components/microComponents"
import { toast } from "react-hot-toast"
import { readDatabaseEntry, updateDatabaseEntry } from "../../../util/CRUD"
import { GlobalContext } from "../../../context/GlobalContext"

const CVUpload = ({ id }) => {
  const { setAppsData } = useContext(GlobalContext);

  const saveCVPdfHandler = (uploadPdfUrl) => {
    const saveCVPdfPromise = window.electron
      .savePdf('save-cv', {
        applicationID: id,
        uploadPdfUrl,
      })
    saveCVPdfPromise.then((savedRelativeUrl) => {
      updateDatabaseEntry(
        'UPDATE applications SET cv_url=? WHERE id=?',
        [savedRelativeUrl, id],
        ({ error }) => {
          if (error) console.error(error);
          readDatabaseEntry(
            'SELECT * FROM applications',
            null,
            ({ error, result }) => {
              if (error) console.error(error);
              setAppsData(result);
            }
          );
        }
      );
    }).catch((error) => {
      console.error(error);
    });
    toast.promise(saveCVPdfPromise, {
      loading: 'Loading',
      success: (savePath) => `Successfully uploaded PDF at ${savePath}`,
      error: 'Error uploading CV PDF',
    });
  };

  return <FilePicker label="Upload CV PDF" accept=".pdf" onChange={(event) =>
    saveCVPdfHandler(event.target.files[0].path)
  } id="uploadCVPdfPicker" />
}

export default CVUpload