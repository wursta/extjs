Ext.define('Fiddle.form.field.TreeComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.treecombo',

    pickerConfig: {},

    separator: ' / ',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            displayTpl: new Ext.XTemplate(
                '<tpl for=".">{[this.getNodePath(values)]}</tpl>',
                {
                    getNodePath: function(values) {
                        var store = me.getStore(),
                            node = store.getNodeById(values.id);
                        if (node) {
                            var dF = me.displayField,
                                sep = me.separator;
                            return node.getPath(dF, sep).replace(store.getRoot().getPath(dF, sep) + sep, '');
                        }

                        return values[me.displayField];
                    }
                }
            )
        });

        this.callParent();
    },

    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'treepanel',
                id: me.id + '-picker',
                floating: true,
                store: me.getPickerStore(),
                rootVisible: me.rootVisible,
                refresh: function () {
                    return this.getView().refresh();
                },
                bindStore: function (store, initial) {
                    if (!store) {
                        this.store = null;
                        return;
                    }

                    this.callParent([store, initial])
                },
                listeners: {
                    itemclick: {
                        scope: me,
                        fn: 'onTreeItemClick'
                    }
                }
            }, me.pickerConfig);

        picker = me.picker = Ext.widget(pickerCfg);

        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }

        picker.getSelectionModel().on({
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            scope: me
        });

        return picker;
    },

    onTreeItemClick: function (treeview, record) {
        this.setValue(record.get(this.valueField));
    }
});
