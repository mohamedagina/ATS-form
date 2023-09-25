import { useDispatch, useSelector } from 'react-redux';
import { updateCover, deleteCover, RootState } from '../../store';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import './CoverUpload.css';

import { validateImage } from '../../helpers';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Panel } from '..';

export const CoverUpload = () => {
  const [file, setFile] = useState<File | undefined>();
  const image = useSelector((state: RootState) => {
    const cover = state.application.data?.attributes?.coverImage;
    if (cover === 'http://example.com') return '';
    return cover;
  });
  const dropZone = useRef(null);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  useEffect(() => {
    const dropZoneEl = dropZone.current as null | HTMLElement;
    if (!dropZoneEl) return;

    const handleInDropZone = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZoneEl.classList.add('active');
    };

    const handleOutDropZone = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZoneEl.classList.remove('active');
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZoneEl.classList.remove('active');
      const files = e.dataTransfer?.files;
      if (!files) return;

      const image = files[0];
      const { isValid, error } = validateImage(image);
      if (!isValid) message.error(error, 3);
      else setFile(image);
    };

    dropZoneEl.addEventListener('dragenter', handleInDropZone);
    dropZoneEl.addEventListener('dragover', handleInDropZone);
    dropZoneEl.addEventListener('dragleave', handleOutDropZone);
    dropZoneEl.addEventListener('drop', handleDrop);

    return () => {
      dropZoneEl.removeEventListener('dragenter', handleInDropZone);
      dropZoneEl.removeEventListener('dragover', handleInDropZone);
      dropZoneEl.removeEventListener('dragleave', handleOutDropZone);
      dropZoneEl.removeEventListener('drop', handleDrop);
    };
  }, [file]);

  useEffect(() => {
    if (file) dispatch(updateCover(file));
  }, [file, dispatch]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const { isValid, error } = validateImage(files[0]);
    if (isValid) {
      setFile(files[0]);
      return;
    }

    message.error(error, 3);
  };

  const handleDelete = () => {
    setFile(undefined);
    dispatch(deleteCover());
    const inputEl = document.getElementById('cover-upload') as HTMLInputElement;
    inputEl.value = '';
  };

  return (
    <Panel title={!image ? 'Upload cover image' : ''}>
      <>
        <label
          ref={dropZone}
          htmlFor="cover-upload"
          className={`cover-upload ${image ? 'hidden' : ''}`}
        >
          <UploadOutlined />
          Upload cover image
          <span className="upload-hint">
            16:9 ratio is recommended. Max image size 1mb
          </span>
        </label>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          name="coverImage"
          onChange={handleFileChange}
        />
      </>

      {image && (
        <div className="cover-container">
          <img src={image} alt="Position cover" />

          <button className="delete-reupload" onClick={handleDelete}>
            <CloseOutlined /> Delete & re-upload
          </button>
        </div>
      )}
    </Panel>
  );
};
