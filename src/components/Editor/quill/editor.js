import ImageResize from '@/lib/quill-image-resize/src/ImageResize'

Quill.register('modules/imageResize', ImageResize)

const editor = {
  options : {
    modules: {
      toolbar: '#editor-toolbar',
      imageResize : {
        modules : ['Resize', 'DisplaySize']
      }
    },
    placeholder: '请输入内容'
  }
};

export default editor;
