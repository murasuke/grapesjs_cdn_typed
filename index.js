const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  plugins: ['gjs-blocks-basic' /*, ckeditor*/],
  // pluginsOpts: {
  //   'grapesjs-plugin-ckeditor': {/* ...options */}
  // },
  i18n: {
    messagesAdd: {
      ja: {
        assetManager: {
          addButton: '画像追加',
          inputPlh: 'http://path/to/the/image.jpg',
          modalTitle: '画像選択',
          uploadTitle: 'ファイルをドロップするかクリックしてアップロード',
        },
        blockManager: {
          labels: {
            // 'block-id': 'Block Label',
          },
          categories: {
            Basic: '基本コンポーネント',
            Additional: '追加コンポーネント',
          },
        },
        styleManager: {
          sectors: {
            'first-sector-id': 'First sector JA',
          },
          properties: {
            width: '幅',
            height: '高さ',
            'display-prop-id': 'Display JA',
            'margin-top-sub': '上',
            'margin-right-sub': '右',
            'margin-left-sub': '左',
            'margin-bottom-sub': '底',
          },
          options: {
            'display-prop-id': {
              block: 'Block 日',
              inline: 'Inline 日',
              none: 'None 日',
            },
          },
        },
      },
    },
  },
  layerManager: {
    appendTo: '#layers-container',
  },
  blockManager: {
    appendTo: '#blocks-container',
  },
  styleManager: {
    appendTo: '#style-manager-container',
    sectors: [
      {
        name: 'General',
        open: false,
        buildProps: [
          'float',
          'display',
          'position',
          'top',
          'right',
          'left',
          'bottom',
        ],
      },
      {
        name: 'Dimension',
        open: false,
        buildProps: [
          'width',
          'height',
          'max-width',
          'min-height',
          'margin',
          'padding',
        ],
      },
      {
        name: 'Typography',
        open: false,
        buildProps: [
          'font-family',
          'font-size',
          'font-weight',
          'letter-spacing',
          'color',
          'line-height',
          'text-align',
          'text-shadow',
        ],
      },
      {
        name: 'Decorations',
        open: false,
        buildProps: [
          'border-radius-c',
          'background-color',
          'border-radius',
          'border',
          'box-shadow',
          'background',
        ],
      },
      {
        name: 'Extra',
        open: false,
        buildProps: ['opacity', 'transition', 'perspective', 'transform'],
        properties: [
          {
            type: 'slider',
            property: 'opacity',
            defaults: 1,
            step: 0.01,
            max: 1,
            min: 0,
          },
        ],
      },
    ],
  },
  selectorManager: {
    appendTo: '#selectors-container',
  },
  traitManager: {
    appendTo: '#traits-container',
  },
  panels: {
    defaults: [
      {
        id: 'layers',
        el: '#layers',
        resizable: {
          tc: 0,
          cr: 1, // layerは右側にリサイズバーを表示
          cl: 0,
          bc: 0,
          keyWidth: 'flex-basis',
        },
      },
      {
        id: 'styles',
        el: '#style-manager',
        resizable: {
          tc: 0,
          cr: 0,
          cl: 1, // 左側にリサイズバーを表示
          bc: 0,
          keyWidth: 'flex-basis',
        },
      },
    ],
  },
});

console.log(editor.I18n.getLocale()); // ja でも未翻訳なので、fallbackでenを表示

//
const blockManager = editor.Blocks;
const cat = blockManager.getCategories();
console.log(cat);
blockManager.add('section', {
  label: '<b>Section</b>', // You can use HTML/SVG inside labels
  media: `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve">
<path id="XMLID_1210_" d="M76,2H16c-2.2,0-4,1.8-4,4v80c0,2.2,1.8,4,4,4h60c2.2,0,4-1.8,4-4V6C80,3.8,78.2,2,76,2z M72,82H20V10h52
V82z M30,67.5c0-1.9,1.6-3.5,3.5-3.5h23.8c1.9,0,3.5,1.6,3.5,3.5S59.3,71,57.3,71H33.5C31.6,71,30,69.4,30,67.5z M30,53.5
c0-1.9,1.6-3.5,3.5-3.5h23.8c1.9,0,3.5,1.6,3.5,3.5S59.3,57,57.3,57H33.5C31.6,57,30,55.4,30,53.5z M61,24.5c0-1.9-1.6-3.5-3.5-3.5
h-24c-1.9,0-3.5,1.6-3.5,3.5v14c0,1.9,1.6,3.5,3.5,3.5h24c1.9,0,3.5-1.6,3.5-3.5V24.5z M37,28h17v7H37V28z"/>
</svg>`,
  attributes: { class: 'gjs-block-section' },
  category: 'Additional',
  content: `<section>
        <h1>This is a simple title</h1>
        <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
      </section>`,
});

// headerに独自パネルを追加(リサイズ用パネル)
const panelManager = editor.Panels;
panelManager.addPanel({
  id: 'header_panel',
  el: '#header',
  resizable: {
    tc: 0,
    cr: 0,
    cl: 0,
    bc: 1, // リサイズ用バーをbottomに
    //keyWidth: 'flex-basis', // リサイズ指定はデフォルト(width)
  },
});

// footerに独自パネルを追加(リサイズ用パネル)
panelManager.addPanel({
  id: 'footer_panel',
  el: '#footer',
  resizable: {
    tc: 1, // リサイズ用バーをtopに
    cr: 0,
    cl: 0,
    bc: 0,
    //keyWidth: 'flex-basis', // リサイズ指定はデフォルト(width)
  },
});

// 内部にボタンを設定(コンポーネントの枠線(表示/非表示)
const newPanel = panelManager.addPanel({
  id: 'myNewPanel',
  el: '.panel__basic-actions',
  visible: true,
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: `<span class="material-symbols-outlined">select</span>`,
      command: 'sw-visibility', // Built-in command
    },
    {
      id: 'clear-button',
      active: true, // active by default
      className: 'btn-clear-editor gjs-four-color',
      label: `<span class="material-symbols-outlined">delete</span>`,
      command: 'core:canvas-clear', // Built-in command
    },
    {
      id: 'export',
      className: 'btn-open-export',
      label: `<span class="material-symbols-outlined">
      html
      </span>`,
      command: 'export-template', // 'core:open-code' も同じ
      context: 'export-template', // For grouping context of buttons from the same panel
    },
    {
      id: 'open-code',
      className: 'btn-open-code',
      label: `<span class="material-symbols-outlined">
      code
      </span>`,
      command: (editor) => {
        const selected = editor.getSelected();
        editor.Modal.setTitle('Components HTML')
        .setContent(
          `<textarea style="width:100%; height: 250px;">${selected ? selected.toHTML() : editor.getHtml()}</textarea>`
        )
        .open();

        //editor.getHtml();
        //editor.getCss();
      }
    },
    {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(
            `<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`
          )
          .open();
      },
    },
    {
      id: 'open-modal',
      className: 'btn-open-modal',
      label: `<span class="material-symbols-outlined">
      open_in_new
      </span>`,
      context: 'core:open-modal',
      command: (editor) => {
        openModal();
      },
    },
  ],
});

// Open modal
const openModal = () => {
  const content = document.createElement('div');
  content.innerHTML = `<input id="txtText" type="text"> <button onclick="closeModal()" >閉じる</button>`;
  editor.Modal.open({
    title: 'My title', // string | HTMLElement
    content: content, // string | HTMLElement
  });
};
const closeModal = () => {
  const content = editor.Modal.getContent();
  console.log(content.querySelector('#txtText').value);
  editor.Modal.close();
};

// コンポーネントを上下に移動(試作品)
editor.on('component:selected', () => {
  const selectedComponent = editor.getSelected();
  if (selectedComponent && selectedComponent.parent()) {
    const commandMoveUpClass = '';
    const commandMoveDownClass = '';

    const commandMoveUp = (args) => {
      const selected = editor.getSelected();

      const selectedIndex = selected.collection.indexOf(selected);
      if (selected.parent()) {
        if (selectedIndex > 0) {
          selected.move(selected.parent(), { at: selectedIndex - 1 });
        } else {
          // 先頭の場合親の親の最後に移動(注意：うまく動いてない)
          const parent = selected.parent().parent();
          if (parent) {
            if (editor.Components.canMove(parent, selected)) {
              selected.remove({ temporary: true });
              parent.append(selected, {
                at: parent.collection.length,
              });
            }
          }
        }
      }
    };

    const commandMoveDown = (args) => {
      const selected = editor.getSelected();

      const selectedIndex = selected.collection.indexOf(selected);

      const parent = selected.parent();
      selected.remove({ temporary: true }); // temporary option will avoid removing component related styles
      parent.append(selected, { at: selectedIndex + 1 });

      // テストコード：ひとつ前と後のComponentを取得する方法
      // const layerData = editor.Layers.getLayerData(selected);
      // console.log(layerData);
      const collection = selected.collection;
      if (selectedIndex > 0) {
        const prevModel = collection.at(selectedIndex - 1);
      }
      if (selectedIndex < collection.length - 1) {
        const nextModel = collection.at(selectedIndex + 1);
      }
    };

    const defaultToolbar = selectedComponent.get('toolbar');
    const commandExists = defaultToolbar.some(
      (item) => item.command.name === 'commandMoveUp'
    );

    if (!commandExists) {
      selectedComponent.set({
        toolbar: [
          ...defaultToolbar,
          {
            attributes: { class: commandMoveUpClass },
            label:
              '<span class="material-symbols-outlined material-icons md-16" style="position: relative;top:5px;">arrow_upward</span>',
            command: commandMoveUp,
          },
          {
            attributes: { class: commandMoveDownClass },
            label:
              '<span class="material-symbols-outlined material-icons md-16" style="position: relative;top:5px;">arrow_downward</span>',
            command: commandMoveDown,
          },
        ],
      });
    }
  }
});
