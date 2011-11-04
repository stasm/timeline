function centerSimileAjax(date) {
    tl.getBand(0).setCenterVisibleDate(SimileAjax.DateTime.parseGregorianDateTime(date));
}

function setupFilterHighlightControls(div, timeline, bandIndices, theme) {
    
    var handler = function(elmt, evt, target) {
        onKeyPress(timeline, bandIndices);
    };
    
    $("#filter").keypress(handler);
    $("#clear").click(function() {
        clearAll(timeline, bandIndices);
    });
}

var timerID = null;
function onKeyPress(timeline, bandIndices) {
    if (timerID != null) {
        window.clearTimeout(timerID);
    }
    timerID = window.setTimeout(function() {
        performFiltering(timeline, bandIndices);
    }, 300);
}
function cleanString(s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '');
}
function performFiltering(timeline, bandIndices) {
    timerID = null;
    
    var text = cleanString($('#filter').val());
    
    var filterMatcher = null;
    if (text.length > 0) {
        var regex = new RegExp(text, "i");
        filterMatcher = function(evt) {
            return regex.test(evt.getText()) || regex.test(evt.getDescription());
        };
    }
    
    for (var i = 0; i < bandIndices.length; i++) {
        var bandIndex = bandIndices[i];
        timeline.getBand(bandIndex).getEventPainter().setFilterMatcher(filterMatcher);
    }
    timeline.paint();
}
function clearAll(timeline, bandIndices) {
    $('#filter').val("");
    window.location.hash = '';
    
    for (var i = 0; i < bandIndices.length; i++) {
        var bandIndex = bandIndices[i];
        timeline.getBand(bandIndex).getEventPainter().setFilterMatcher(null);
    }
    timeline.paint();
}
