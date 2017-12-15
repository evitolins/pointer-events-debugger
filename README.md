pointer-events-debugger
===============================================================================
A simple page displaying important pointer event data

The PointerEvents API is fairly new, and some browsers are not yet completely
consistent with the W3C spec or even their own documentation. 



Usage
---------------------------------------
1. Visit https://evitolins.github.io/pointer-events-debugger/
2. Click and drag anywhere in the window
3. Eventually, enough actions are recorded and the page will automatically
prompt you to save a .json data file



Advanced
---------------------------------------
You can filter what events are actually recorded by entering them by name in the URL like so:

https://evitolins.github.io/pointer-events-debugger/#pointermove,pointerdown,pointerup

> TIP: _See javascript code for a list of "listenable_events"_
