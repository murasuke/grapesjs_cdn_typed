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
  media: '<span class="material-symbols-outlined">text_snippet</span>',
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
            `<textarea style="width:100%; height: 250px;">${
              selected ? selected.toHTML() : editor.getHtml()
            }</textarea>`
          )
          .open();

        //editor.getHtml();
        //editor.getCss();
      },
    },
    {
      id: 'open-css',
      className: 'btn-open-css',
      label: `css`,
      command: (editor) => {
        const selected = editor.getSelected();
        editor.Modal.setTitle('Components HTML')
          .setContent(
            `<textarea style="width:100%; height: 250px;">${
              selected ? findComponentStyles(editor, selected) : editor.getCss()
            }</textarea>`
          )
          .open();

      },
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
  ],
});



/**
 *
 * @param {import('grapesjs').Editor} editor
 * @param {string} id
 * @returns {string}
 */
function getCss(editor, id) {
  const style = editor.CssComposer.getRule(`#${id}`);
  const hoverStyle = editor.CssComposer.getRule(`#${id}:hover`);

  if (style) {
    if (hoverStyle) {
      return style.toCSS() + ' ' + hoverStyle.toCSS();
    }
    return style.toCSS();
  } else {
    return '';
  }
}

/**
 *
 * @param {import('grapesjs').Editor} editor
 * @param {string} id
 * @returns {string}
 */
function findComponentStyles(editor, selected) {
  let css = '';
  if (selected) {
    const childModel = selected.components().models;
    if (childModel) {
      for (const model of childModel) {
        css = css + findComponentStyles(editor, model);
      }
      return css + getCss(editor, selected.getId());
    } else {
      return getCss(editor, selected.getId());
    }
  }
}

/**
 *
 * @param {import('grapesjs').Editor} editor
 * @param {import('grapesjs').Component} selected
 * @param {string} name_blockId
 * @returns {string}
 */
function createBlockTemplate(editor, selected, name_blockId) {
  const blockId = name_blockId.blockId;
  const name = name_blockId.name;

  let elementHTML = selected.getEl().outerHTML;
  let first_partHtml = elementHTML.substring(0, elementHTML.indexOf(' '));
  let second_partHtml = elementHTML.substring(elementHTML.indexOf(' ') + 1);
  first_partHtml += ` custom_block_template=true block_id="${blockId}" `;
  let finalHtml = first_partHtml + second_partHtml;
  const blockCss = findComponentStyles(editor, selected);
  const css = `<style>${blockCss}</style>`;
  const elementHtmlCss = finalHtml + css;

  editor.BlockManager.add(`customBlockTemplate_${blockId}`, {
    category: 'Custom Blocks',
    attributes: { custom_block_template: true },
    label: `${name}`,
    media: `<span class="material-symbols-outlined">
    assignment
    </span>`,
    content: elementHtmlCss,
  });
}

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
  const block_name = content.querySelector('#txtText').value;
  console.log(block_name);
  createBlockTemplateConfirmation(block_name);
  editor.Modal.close();
};

function  createBlockTemplateConfirmation (name) {
    const selected = editor.getSelected();
    // let name = this.blockTemplateForm.get('name')!.value
    let blockId = 'customBlockTemplate_' + name.split(' ').join('_');
    let name_blockId = {
      'name': name,
      'blockId': blockId
    };

    createBlockTemplate(editor, selected, name_blockId);

}

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
          {
            attributes: { class: '' },
            label:
              '<span class="material-symbols-outlined material-icons md-16" style="position: relative;top:5px;">add_notes</span>',
            command: openModal,
          },
        ],
      });
    }
  }
});
