import { Form } from 'formik'
import React, { Fragment, useState } from 'react'
import { fetch } from '../core/fetch';

export const FileUpload = () => {
    const [file , setFile] = useState('');
    const [fileName , setFileName] = useState('Choose File');
    const [uploadFile, setUploadFile] = useState({})
    
    const onChange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit= async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)

        try{
            
              const res = await fetch({
                url: '/api/user/upload',
                method: 'post',
                body: formData,
              });

            const {fileName, filePath} = res.data;
            
            setUploadFile({ fileName, filePath})
            console.log('sfdfsd', uploadFile.filePath)
        }catch(err){
            if(err.response.status === 500){
                console.log('There is a problem with the server')
            }else{
                console.log(err.response.data.msg)
            }
        }
    }
    
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                   
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onChange} />
                    <label for="exampleFormControlFile1">{fileName}</label>
                </div>

               <input type="submit" value="upload" className="btn btn-primary btn-block"/>
            </form>

            {uploadFile ? 
            <div className = "row mt-5" >
            <div col-md-6 m-auto >
                
                <h3 className="text-center">{uploadFile.fileName}</h3>
                <img style={{width: '100%'}} src={uploadFile.filePath}/>
            </div>
            
            </div>
            : null}

        </Fragment>
    )
}
export default FileUpload