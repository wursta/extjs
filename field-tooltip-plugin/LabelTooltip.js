Ext.define('Fiddle.form.field.plugins.LabelTooltip', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.labeltooltip',

    tip: null,
    iconCls: 'x-fa fa-question-circle',

    labelTipTpl: new Ext.Template(
        '{fieldLabelText} <span class="{labelTipCls}" id="{tooltipId}"></span>'
    ),

    init: function (field) {
        var me = this;
        var tooltipId = field.getId() + 'plugin-labeltooltip';
        var tplData = Ext.apply({
                tooltipId: tooltipId
            },
            this.getLabelTipTplData()
        );

        field.setFieldLabel(
            this.labelTipTpl.apply(tplData)
        );

        field.addListener('render', function (cmp) {
            Ext.create('Ext.tip.ToolTip', {
                target: tooltipId,
                html: Ext.util.Format.htmlEncode(me.tip)
            });
        });
    },

    getLabelTipTplData: function () {
        return {
            fieldLabelText: this.getCmp().getFieldLabel(),
            labelTipCls: this.iconCls
        }
    }
});
