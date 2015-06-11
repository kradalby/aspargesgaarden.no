-module(aspargesgaarden_index_controller, [Req]).
-compile(export_all).

lost('GET', []) ->
    {ok, [{}]}.

hello('GET', []) ->
    {ok, [{redirect, "/hjem"}]}.

page('GET', [PageName]) ->
    Pages = boss_db:find(page, []),
    Page = boss_db:find_first(page, [{url, 'equals', PageName}]),
    {ok, [{page, Page}, {pages, Pages}]}.


