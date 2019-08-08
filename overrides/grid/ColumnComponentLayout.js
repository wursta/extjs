Ext.define('Fiddle.overrides.grid.ColumnComponentLayout', {
    override: 'Ext.grid.ColumnComponentLayout',
    publishInnerHeight: function (ownerContext, outerHeight) {
        var owner = this.owner,
            titleEl = owner.titleEl;

        var titleElWidth = 0;
        owner.items.each(function (col) {
            if (!col.isHidden()) {
                titleElWidth += col.getWidth();
            }
        });
        if (titleElWidth) {
            titleEl.setWidth(titleElWidth);
            titleEl.setHeight(titleEl.getHeight());
            titleEl.setWidth(null);
        }

        this.callParent(arguments);
    }
});
