'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import config from '@/lib/config';
import { toast } from './ui/use-toast';
import ImgurUploaderInit from 'ckeditor5-imgur-uploader';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ImgurUploader = ImgurUploaderInit({ clientID: config.setting.imgur });

const classicConfiguration = {
  extraPlugins: [ImgurUploader],
};

export default function CustomEditor({ data, onChange }) {
  return (
    <div className="">
      <CKEditor
        editor={ClassicEditor}
        config={classicConfiguration}
        data={data}
        onChange={(event, editor) => {
          const _data = editor.getData();
          // console.log({ event, editor, _data });
          onChange(_data);
        }}
        onError={(error) => {
          console.error('Custom Editor: ', error);
          toast({ variant: 'destructive', title: 'Opps!', description: error.message });
        }}
      />
    </div>
  );
}
