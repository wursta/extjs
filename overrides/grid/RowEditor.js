Ext.define('Fiddle.overrides.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    onFieldTab: function(e) {
        if (Ext.getVersion().isLessThan('6.2.1')) {
            var me = this,
                activeField = me.activeField,
                forwards = !e.shiftKey,
                target = activeField[forwards ? 'nextNode' : 'previousNode'](':focusable');

            if (target) {
                var scroll = activeField.column.getWidth();
                activeField.column.getView().getScrollable().scrollBy(scroll);
            }
        }

        this.callParent([e]);
    }
});
