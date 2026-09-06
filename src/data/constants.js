// src/data/constants.js
// Datos estáticos extraídos de index.html (Paso 1 de modularización).

/* tiles reales del proyecto (16×16), embebidos como base64 — el resto de iconos son huecos
   marcados con .slot[data-icon] hasta que existan sus assets (ver lista pendiente) */
export const TILE_B64 = {
  character:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAi5u0JitE4Zpldjs2wMvc98KCvWxKPyYxHCVAtQAAAAF0Uk5TAEDm2GYAAABpSURBVAjXRc3BCcAgDAVQjy7QCQQXKJRuUK8ehE4QFyj9HoVazNhNcum/5PEJiXN/WKLTK7oWA0ha8QFcBlRUw01EBooUDVtYg+HZaGc9k4FFDvFbJCfL7lJKJsUEmoJHGkneep5tNu4fSh4qTrVfKjgAAAAASUVORK5CYII=',
  coin:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAA44Yo/b5TPyYxPSBMUwAAAAF0Uk5TAEDm2GYAAAA0SURBVAjXY2BAAPs/QOL/fwYG5l/rDzAwP50NJJ5FA4mX2SDuahAXJPYKJAZSAlYM0QYDAMPmGEjGqGq5AAAAAElFTkSuQmCC',
  /* mejora de diseño 2026-09 #10: monedas de plata/cobre reales (pack/made/moneda_plata.png,
     moneda_cobre.png, convertidas a base64 igual que el resto de TILE_B64) — antes toda cifra
     de dinero, por pobre que fuera el personaje, se mostraba con la MISMA moneda de oro; ahora
     coinIconFor()/coinLabelFor() (ver más abajo) eligen la denominación según el monto. */
  coin_silver:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVR4AbSOQQqDQBAEN3lM7rnkFPATyVfyiHwl+YTgyYt3P6OUODI79oogCu3u9HQXe00Hv3MA1e0+KKnHrl5AUQXx1C4D+MD3/0teAJDPMGcADESxbtqEmDnxuEdJgIWq52OBmBfPIsCXuceizUUAzya0VWZfBLC0ssHwooqAPWVgEvB5vdlNAoS8Ny3mXwao++4y+4mCl/k+g5cBMGIAz6R2KwBhgkrsoiQghrbmEQAA//9lnSbrAAAABklEQVQDALlxUiFHz0eRAAAAAElFTkSuQmCC',
  coin_copper:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtklEQVR4AbSOMQ6CQBBFV29hYm1lY23hJTyLh/AsXsLC2oaKmoRjQB5hyOzwl5AQSD678+f/lz2mjd8+gMfl1impx85eQFEF8dQuA/jA+3lKXgCQzzBnAAxE8Vc1CTFz4nGPkgAL3a/nCWJePIsAX+YeizYXATyb0FKZfRHA0soGw4sqAtaUgUnA69OyGwQIeW9YjL8M8K3/h9FPFLzM9xm8DIARA3gmtZsBCBNUYhclATG0NPcAAAD//3NAaZMAAAAGSURBVAMAJjZSIdc5LSYAAAAASUVORK5CYIIA',
  heart:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAA6EU3/3VxPyYxA/xhCQAAAAF0Uk5TAEDm2GYAAAA2SURBVAjXY2BAA///MzAw//9/gIH/9esPDPxZK2HE1fAPDMxf4w8wMPytB6qz/wMk+D+gawcATcITsQMTiWUAAAAASUVORK5CYII=',
  cross:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAWmmIwMvci5u0JitEz9Hs1QAAAAF0Uk5TAEDm2GYAAAA/SURBVAjXY2BAABYXFwcwwwUIILSSEojFAmE4MLA4KRkbK6kgM5yNgcAEmeHiIigINsnFxdgYahCQwUCAAQEA7QsRI05T6lEAAAAASUVORK5CYII=',
  flower:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAA/9iWhMZpxuWNTpdMvWxK44Yo/b5TPyYxispMvwAAAAF0Uk5TAEDm2GYAAABQSURBVAjXY2BgYOjoYACDjg4Ii6OjvaKjAcRoSy/LADE62kQDM0ByHeWhoeWoDJgUXDFcO0NHi7MFRKTJGMJocTLugDI8oHY5aTRAbG8CMQDaYSH0VWbfCwAAAABJRU5ErkJggg==',
  sheep:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAi5u0JitEUmB8Pk5uwMvcWmmI////PyYxfHRyEgAAAAF0Uk5TAEDm2GYAAABjSURBVAjXY2BABh0dHTC6owFMtZdXdDBwdHS0uQmmdDAAuW1uaSBGeXl5UZoGhFGWlgFklIaXl7l4NIAZ5SDtQKnw8lAwAyhSDjQZqL0cZB4DR2trR0QE0AaO5uYOC4sGhAsAK9EsSV8rAxoAAAAASUVORK5CYII=',
  cow:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAB5QTFRFAAAA/3BtJitE4ZplUmB898KCwMvci5u0////PyYxOJ26DQAAAAF0Uk5TAEDm2GYAAABnSURBVAjXY2BAApwzOWeCGTOBYAKYETkzcgKYbwmEQAUzp2V0pM1kmDmjvCStLRPI6CgvUWvTnABmpJlaQhmhkSBGe4UbyJyZ7R1A0AkS6ego7wCJTBOUnDYNaBfnjOkzZ8yYiXACAH2fMAkBIA6HAAAAAElFTkSuQmCC',
  chicken:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAB5QTFRFAAAAJitE/b5T8oRi44YoUmB8wMvcw0s1////PyYx8TFYlQAAAAF0Uk5TAEDm2GYAAABeSURBVAjXY2DABjhnzpwAZswEAohA+fSZYHpyeeVMsES5RSeU0dExEyTTOb1DAqiNc0ZHRkeTJojRFtHRDhKZ1tHalp4JYqSldqSBGDNTIzo6gAyGmTNcWjxmImwGAJzvJ0eenr9mAAAAAElFTkSuQmCC',
  chest:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAJitEWmmIdjs2i5u06qVsvWxKwMvcPyYx383hIwAAAAF0Uk5TAEDm2GYAAABHSURBVAjXY2DAABwdYNDA0AEFDB0pbmlpKW5ARnppaGh4GX4GXHGKW3k5mFFeVCiuXo7MUDYuLzc2AjLK0oyN09JBUmDQAQDusS8nXSnWbQAAAABJRU5ErkJggg==',
  woman:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAB5QTFRFAAAA6qVsJitE4Zpldjs20XbQm0yj98KCvWxKPyYxwZOybwAAAAF0Uk5TAEDm2GYAAABuSURBVAjXRc2xDYAwDATAtBmBCRiAgg2QGAAkFjCiR3IYAOXpUiDgt8Wm4Ruf/guH8IcWv9FRvDgTeq+YM0BfkAwlxBPIqTc8qLU+HNlQfdBWvwaqq4E3mqbbGKhJxlkdz7BPDl4ii72NFBkXlheWKDJppxZU3AAAAABJRU5ErkJggg==',
  baby1:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVR4nGP8/5+BIsBEmfbBYAALNkEHdUOsIXPg5nlGgi7ApRmXHCNyLCArOLA2H1Vz8ESsLsEaBuiacYnhNICBgYFBPWIJw8dHtxk+PrrNoB6xBJcy7IH48dFthpsrYuD8mytUGT4+uk28Af6F2xg29nthiBFtwIG1+QwMOvGoYnKqKAEJA1jDAJtCbGIYBqAklCsLGRzUjRgc1I0YGK4sxK6GAS0dkAMozgsAxg08wWR0ifYAAAAASUVORK5CYII=',
  baby2:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVR4nGP8/5+BIsBEmfbBYAALNkEHdUOsIXPg5nlGgi7ApRmXHCNyLCAr2DEnEEWhR8p6rC7BGgbomnGJ4TSAgYGBQT/zEMOrG48ZXt14zKCfeQiXMuyB+OrGY4aL0+3g/IvTZRle3XhMvAFxPWcYFpVgihFtwI45gQwctrWoYhrNKAEJA1jDAJtCbGIYBiBHz4/DzQwO6kYMDupGDD8ON2NVw8CAlg7IARTnBQDrgj7oLcuSewAAAABJRU5ErkJggg==',
  baby3:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqklEQVR4nGP8/5+BIsBEmfbBYAALNkEHdUOsIXPg5nlGgi7ApRmXHCNyLCArWNVghaIwrOEYVpdgDQN0zbjEcBrAwMDAYNt6k+HB1acMD64+ZbBtvYlLGfZAfHD1KcPhanU4/7A2RIxoA8pWP2TowiJGtAGrGqwYxCKnoIpp56AEJAxgDQNsCrGJYRiAHD2vlucwOKgbMTioGzG8Wp6DVQ0DA1o6IAdQnBcAY8g+D1C8sA8AAAAASUVORK5CYII=',
  baby4:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAq0lEQVR4nGP8/5+BIsBEmfbBYAALNkEHdUOsIXPg5nlGgi7ApRmXHCNyLCAr6IpRQVFYtuQOVpdgDQN0zbjEcBrAwMDAELvyPcP9W68Y7t96xRC78j0uZdgD8f6tVwyLw8Xg/MVqEDGiDZh+6hNDJhYxog3oilFhMKtdhSKm2ByGEpAwgDUMsCnEJoZhAHL0nGoOY3BQN2JwUDdiONUchlUNAwNaOiAHUJwXAJigPk2AxeC6AAAAAElFTkSuQmCC',
  baby5:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtklEQVR4nGP8/5+BIsBEmfbBYAALNkEHdUOsIXPg5nlGgi7ApRmXHCNyLCAriDThRlG4/MxXrC7BGgbomnGJ4TSAgYGBoe8iB8Pdx58Y7j7+xNB3kQOXMuyBePfxJ4YifQYGBgY+BgYGBoYi2R8Mdx9/YmBgYCbOgFMvmRkYGD5hESPSBZEm3AzpSw+jiM2MtkUJSBjAGgbYFGITY2BAi0YGBkRURppwwzUhs9ETE4YBpAKK8wIA43VAeMQ//+AAAAAASUVORK5CYII=',
  wizard:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLElEQVR4AXSQoU5DQRREb5/jB/AYLCF8AAKBJwgMP0IICQIEAoFBoICEEOgHkBAEQZO2oqZNbUUrKioq2z03Oy+ve9Oms7M7M3d28yrLv8Pd/WWJbDlt8rwA01PFIl3ctKVV2jxf7th393ENDMjf5PkLCArv5xcmMIQulo4mhIKz11sTCH18nkJe2tRdTEsoSJqHuY29wLD2TQ4FDBIGBBe9f6guxXchL6FAg9mvCV2oxbQJBdwgJN+29g4gfwEbPFgIBboFVgjmzDDMWQgFhIAC+gacy2G0UEAINEsIchY4C6FgNvwxcHx1pIwzZ8GFvKwVMMiTJ28vBsbtO4/B0mFybqSlLri/ntrNyZfBT+1tA/N+3wTpMLk06//qd9BpgYfRX6sEJULpMQNWAAAA//+H+Vu6AAAABklEQVQDAAYO0ojJ+rU3AAAAAElFTkSuQmCC',
  sword:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAi5u0vWxKwMvcPyYxo/wp1QAAAAF0Uk5TAEDm2GYAAAA1SURBVAjXY2BgYGBxYYAAFxcHMM3iYgJlOFPEcHEUgRjtYmwMZTipQBgsTiowu6CWAm0HEgAihguh21ObkAAAAABJRU5ErkJggg==',
  shield:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAi5u0vWxKwMvcPyYxo/wp1QAAAAF0Uk5TAEDm2GYAAAAuSURBVAjXY2DAB1yAAESzgBgOIIajsbEImOGspGQCYSgboTNgUnDFMO1wA3ECAAz/CuXOW7hhAAAAAElFTkSuQmCC',
  hammer:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABhQTFRFAAAAdjs2UmB86qVsi5u0vWxKwMvcPyYxq3epsgAAAAF0Uk5TAEDm2GYAAABFSURBVAjXY2BgYCgvZwAB9nIgKADzS8PBYuVuaUkpYEYaEOBguKmlQdSUF4qDdbGDtBeATSw2L4AYXRoOZWCKQOyEOQMATbgdsICtAb0AAAAASUVORK5CYII=',
  anvil:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAAUmB85O35i5u0wMvcJitEu7KpWAAAAAF0Uk5TAEDm2GYAAABVSURBVAjXZc27CcAwDARQNRnAK8gTBJEBjKVeEG7/VXxyCClyzb1CH5F/DjBvI0UAdw8KcwMPphO9oISpajfiNuYC13fX/rAz6iJGa5GFurNRM/n9XorfF7dQs8iEAAAAAElFTkSuQmCC',
  barrel:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAAi5u06qVsvWxKwMvcPyYx1NREsgAAAAF0Uk5TAEDm2GYAAABbSURBVAjXVY2xDYAwDAQtoYzAAjYDoDgsQD49EXj/VbCTBr46/RVHROYjXwq4HOwBWlwGVViYylzcpX4yb+sEmQBmDChADbhrlnJ8n65Z9KcsVMQs1MgvWXaiFxj/GJSMVjWzAAAAAElFTkSuQmCC',
  knife:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAi5u0vWxKwMvcPyYxo/wp1QAAAAF0Uk5TAEDm2GYAAAAzSURBVAjXY2DABlhcoAwXFweogAmU4UyY4eIoAtHvYmwMZTipQBgsTiowA6EmA61AthkAZQIJcPsAuGYAAAAASUVORK5CYII=',
  moneybag:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAA6qVswMvcdzgzvWxKPyYxqggN6wAAAAF0Uk5TAEDm2GYAAABWSURBVAjXVc2xDYAwEENRN9mACZCYIGQARK6PSLz/KtiJKPjV0+kkA4mqAeAMOlSlUxp3zmcYhex/BDmM7ufSwCerg2DdVTVmC9dmDCOoCSm8+o0uAS/bfB9qRZVXgQAAAABJRU5ErkJggg==',
  target:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAAvWxK/3Bt6qVs////6EU3PyYxEVmoHQAAAAF0Uk5TAEDm2GYAAABMSURBVAjXY2DAAtKAAESzgRgJIIEkJSU1kFCaamhoEJgR6uISCmaEhIa6QhghrugMmBRccWpoaBiIwZYoligGMpkt2VDYDMIwSwYyAHACGZKxmHjyAAAAAElFTkSuQmCC',
  hoe:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAABhQTFRFAAAA6qVsUmB8wMvcjJy1vWxKi5u0PyYxSltrqwAAAAF0Uk5TAEDm2GYAAAA4SURBVAjXY2AoB4ECBgZ2MKMcyCh2SUtKQ2U4pxXBRCAMkNJQIIMBzgCx4QxBIkTgjHIogx3oDAD4jB30hrJK6QAAAABJRU5ErkJggg==',
  gear:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDUlEQVR4AZzQIU6DQRDF8aWHIUgQaC6ARWHwJDgkIQSJI8FjUFgugEaAJFwG+pvwNsMXUtGm/+7bNzNvd7saGz5Huwff2NAy/gRohoGsXfPACzOgF6Jvnp4HNMdb6gpIUTM0/Yca1DJTAYyOJsSjkX1fK+D1632HeX16Ypm8fXwOTGMt0pOZCsh11vX5NfhydzVAz8KvyMwqwhWhfv/wWINOgRCemp7jy1tymK0b1G7Ln5UTzHob6Ivzs+EUJ4DmqelxI9ps3YBgdA739yrEMN1rdGYqwClM77PCH2cQ9uAJpDNTAYxOvybfHvSSCsh1NCFNTkT23g77zFRAN7rWjO4t9QxIIclZ42ftPu8HAAD//8/F9tcAAAAGSURBVAMAq1OtS7hVPz8AAAAASUVORK5CYIIA'
};

/* v7: sprites base (16×16) de pack/variantes, con sus colores placeholder
   originales todavía puestos — se recolorean en <canvas> en tiempo real
   con la paleta real de cada personaje (ver PALETTES/recolorToDataURL más
   abajo, en el motor). Solo 6 archivos (~3KB en total): de ahí salen los
   6240+200 sprites reales del pack sin embeber cada PNG generado. */
export const SPRITE_BASE_B64 = {
  hm:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGElEQVR4AaRSsXHCQBBcqRgROJIbgMQloALcBOMKjAtw6gZUghPUAIoIRDPP7sE9+n9BAqPV3e3u7TOSarz4KwLWTRueIT8vCdBibsjn3BMD5sLw+YVhOqYg52FzbwxwUcvYbX28V3Km3RnrigBfDpXp8WYzQyJxa8oACma+VfUCR3hV7ygC3LR6+3CP1Xw2krcioEdPevla0oqA3+abET2m03+SollaQnKwgPlrGaYR3b6zEJ3oqPYVX+vIlevlO7U3orWsih3QhS6BOGnRw0G79g/Y43A+8ikH4EfTA1ALVTCvO2KAE+u/FoxZhDT3eY0Bm+YdgoSeJwmbVQtBvSBNHkG9UA/nMfvmgC2fgSCDoF5QP4d2LwAAAP//1roMCgAAAAZJREFUAwCSzXvnyvmQtAAAAABJRU5ErkJgggAA',
  ha:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVR4AaSSL08DQRDFh9M4vsMhUJzEgEGBxRNskzpCEAhAIHAkhwaBOgsG1BkMSQFBQvsFqupqm3Z+k872brepaXNvd96feW3Sy2TNT1Kwn+9OVyH+vlYBi3Eg5nEmFDSN+uxS6n6vDdW8rJkNBW6yLBcnThe3auYtFJuSAl+ebpgfDuNaEoT5kBaoYeH5zQyUit/MjqTAQ9s7h56xO+Ym6pEUVFKpvPxZ5iUFZX6nFZX0/z5aLXC8lqjECvxvuX6pBBA8yAuJgQd0T3wn8wHRcXx+a0WEHWju+82u/QKErb0jeSif5OvnH2qAAyN64MHJKrUns7NxvN5fSfH7KJPnrnQ2ewZmNLxG1MZQMPp8E4BajgsBN+9DAcwAjwxgBlk9+I7eOZFu59RAAMQcDbA7AwAA//+pkgwYAAAABklEQVQDADW/j4t55AT8AAAAAElFTkSuQmCC',
  hc:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLUlEQVR4AaSSK08DURCFD6tx/ADcBgmbkPAQ4MHWY1BN6pAIQCAwDcliMCBQtWBA1WCa8BAkQIJG4QiOQL6bnM2226ZN2ubrzJyZOd3du5mm/NQMNvKlv3HE/+wzYDE2R+Vxrs/ACwdXHW3vHdVA94xjZRBde0+vuj7ZTzMxoicx/FQG1ubWtpxOFGsGq+sraZFbIBmMaJGaAc353R+dt9siGtf0I0MNGmqkGaJBICdGhhow8PZyp074UqMPkgx8AhzT8uKCNvMiUebHMmjd3oeYwcQ7mRNEw4NjMILmviO76QoQOL7T8kLxrKmBPtCjZpYaKgMK4MUpns/0e9lSc/YhQY5Gj5lIZfB1fyOgWX4XgsPbTwE50GMGyCHrvj/OkERazR2BNXJw7cjuPwAAAP//7HeGrAAAAAZJREFUAwBCgpiLpjxujAAAAABJRU5ErkJgggAA',
  hb:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4AaSRsVXDQBBE1ypGDohEA3ZCCVIBBLTgR857QAGkNKAmUAN2RGA3c+xfPOfzHZBge7Szs7Mj69TZPz9NwKYf0l+o73cVwGJtqPvakwPKwXL/aMtxfw3XFFZ6c4CGLNtuVHuprsXsogRrArScVjHPl+g9JAtn0gb4IMznCgfemipcaAJkWt/cyRO17kP0SxMw2+zy9w8uoMCpJZqAt/7ZI2Z7+nywsfjSMyuX4RFQvpbleLDpZbLJlzlHAY0ZS0A7nQhiNuy84zBKoLmcPc7ZjX/g3D5Oez/lZPZK9wt8llYpvHLkAAmb98E85kcwk081B2z7WwMMZr8T2K4HA3DADA+Ag245HTgneMbozwskwIF6VXa/AAAA///lOa4mAAAABklEQVQDAJyneeddUMvzAAAAAElFTkSuQmCC',
  mw:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMElEQVR4AaSSPVaDQBSF31DYuQ0stNHYa2NjD4WlBVtQd+AW4hbobTzHEyqrhMoiHPfgEibzzfCGgXCSIgmX93fvnQeHTE787Rnc5df2EKbnjQwQTgnTesqJBumgeX6TVddKs90McD01S7nRQIeI7Gspxlqxxmhb5KXwZkMjZN4gdaStYiL1HFTjDZTA6pqnYusWAcxSDvXIgDVpgvzqwT2CeFBfXIY65dAfG9Bx0NNcevSaNUC1/f0iSO3+JFqTp5g1MHagFFLEwrzXMdck07dJI12dk1MgXtZlfCfw0cYNVt2GXiT8L0oBRRUi4modVlMugmhAAe7zG4JUC/H4Pnv0kVpnntDfogFDQH95a+RjLR5/P58+UjODA8hB1nSt+0xIA57O25D0d07u072AdgcAAP//Sj4DLgAAAAZJREFUAwBU6XxaXAqWpAAAAABJRU5ErkJgggAA',
  ow:'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABTklEQVR4AaSRvU4CURCFx30RCxM0sVHJ1tBYSYtvALGwxAdQWwtqqK221UYTgzURbEyUFzCxMbGwhflmd+7ezUIF3DN/58y5u5DIlp+aQatxvNyEdXdVDFhcJ/IZPPCeHAxionN1K+D6PhNADVgAsTYYQIBYOH3/ZCTp0YHlmLOBBjOIHXUWji+6USC08B0z0N5OfMNu719+0pnByCLEGkYVA7+R5a6U30HvDK3BNdZoqBhob+/L6v7hqQBm5PFwaBx9jJqBv+/Xx7OATDLL1K10L921umLgy3fjRyMJPA0ZMHcNPUj816ThXQfTDqXey90lWIZDYwIN7IYnmCxmOtIzWgrCbv9cwG8zz8xEOVVI0GoTDLS2026cyOhNAv4uHkINh+jlsvxXggEkQNBviji42Ws4lm+evikNyetivmNVESbteVHliafJq3pkdwUAAP//gOORpAAAAAZJREFUAwDSUY400/UfiwAAAABJRU5ErkJgggAA',
};

export const NAMES = {
  male:['Edric','Alden','Osric','Wulfstan','Cedric','Baldric','Osmund','Harold','Leofric','Godwin','Aldous','Brennan','Cuthbert','Eadric','Rowan','Wystan','Aelfric','Dunstan',
    'Alfred','Bertram','Colwyn','Drogo','Edmund','Fenwick','Gareth','Hubert','Ingram','Jocelyn','Kenric','Leland','Merrick','Norbert','Oswald','Percival','Quenton','Reynold',
    'Stigand','Theobald','Ulric','Vernon','Wilfred','Aethelred','Bardolf','Cenric','Dunwald','Eldred','Frithric','Grimbald','Hereward','Ivo','Kendrick','Lambert','Osbert'],
  female:['Mara','Elswith','Rowena','Eda','Alwyn','Godiva','Hilda','Wynn','Aveline','Freya','Isolde','Maud','Sela','Wilhelmina','Enid','Ethelind','Alfreda','Cwenneth',
    'Beatrix','Cicely','Dunstana','Editha','Fenella','Gwendolyn','Hawise','Ingrid','Joan','Katherine','Leofa','Millicent','Nesta','Ostryth','Petronella','Quenilda','Rosamund',
    'Sibyl','Thordis','Ursella','Winifred','Ymma','Aelfrida','Bertha','Cwenhild','Dorotea','Emeline','Frideswide','Gunnhild','Hildegard','Idonea','Judith','Leofrun','Osgifu'],
  family:['Hallowford','Brackwater','Fenmoor','Ashcombe','Wychwood','Thornfield','Ravensmere','Oldbrook','Wintermoor','Cairnwell',
    'Northwold','Ellsmere','Greycliff','Hartwell','Rushbrook','Foxhollow','Blackmoor','Sedgewick','Thistlewood','Ironhame']
};
/* nombre único entre todos los personajes VIVOS de ese sexo (padres, hermanos, hijos y
   cualquier vecino/conocido incluidos) — si el pueblo ya agotó el pool entero (partidas muy
   largas, poco frecuente con 50+ nombres por sexo) se repite uno, pero con un apelativo de
   época para distinguir al homónimo, tal como de verdad se distinguía a dos parientes con el
   mismo nombre en registros medievales reales ("el Joven"/"la Joven"), en vez de dos personajes
   idénticos sin más. */

export const TRAITS = ['trabajador/a','perezoso/a','devoto/a','ambicioso/a','prudente','temerario/a','generoso/a','tacaño/a','sociable','reservado/a','fuerte de cuerpo','enfermizo/a','ingenioso/a','testarudo/a'];

/* WORLD_FLAVOR sigue siendo un objeto plano de siempre (todo el motor ya lee WORLD_FLAVOR.xxx
   por referencia), pero desde la cronología del mundo (mejora de diseño 2026-09 #1/#2/#4) sus
   valores ya NO son fijos: applyWorldFlavorForYear() los recalcula según la región y el año de
   la partida (ver REGIONS/WORLD_TIMELINE más abajo) y los reescribe EN EL MISMO objeto, así que
   cada lectura existente (`WORLD_FLAVOR.lordName`, etc.) sigue funcionando sin tocarla. Los
   valores de aquí son el estado por defecto hasta que arranca la partida — coinciden con
   'fenwold' en torno al año 500, la región/época que ya existía antes de esta pasada. */
export const WORLD_FLAVOR = {
  kingdom:'Reino de Aldemark', region:'Marca de Fenwold', lordName:'Lord Ridley de Hallowmere',
  villageName:'Wistleigh', faith:'la Fe de los Siete Faros',
  law:'Por costumbre de la Marca, la hacienda familiar pasa al hijo o hija de mayor edad; si no hubiera descendencia, al cónyuge o a la línea de hermanos.'
};

export const CROP = {name:'trigo', seedCost:3, base:16};

export const ANIMAL_TYPES = {
  cow:{name:'vaca',buy:15,sell:10,income:2,cap:6},
  sheep:{name:'oveja',buy:4,sell:3,income:1,cap:16},
  chicken:{name:'gallina',buy:1,sell:1,income:1,cap:24},
  goat:{name:'cabra',buy:5,sell:3,income:1,cap:14}
};

/* ---------- registro central de profesiones (v4, Parte 4-5) ----------
   Única fuente de verdad: etiqueta, icono, ingreso base, habilidad principal,
   si requiere aprendizaje con un maestro, si se aprende dentro de la familia,
   y las etapas de trayectoria (career.stage) por las que puede pasar. */
export const PROFESSIONS = {
  peasant_farmer:{ label:'Campesino/a agricultor/a', icon:'job:peasant_farmer', category:'agriculture', baseIncome:3, primarySkill:'farming', apprenticeshipRequired:false, familyLearned:true, stages:['helper','worker','skilled'] },
  shepherd:{ label:'Pastor/a', icon:'job:shepherd', category:'agriculture', baseIncome:2.5, primarySkill:'animal_husbandry', apprenticeshipRequired:false, familyLearned:true, stages:['helper','worker','skilled'] },
  farm_worker:{ label:'Jornalero/a agrícola', icon:'job:farm_worker', category:'labor', baseIncome:2, primarySkill:'farming', apprenticeshipRequired:false, familyLearned:false, stages:['helper','worker'] },
  laborer:{ label:'Bracero/a', icon:'job:laborer', category:'labor', baseIncome:2, primarySkill:'farming', apprenticeshipRequired:false, familyLearned:false, stages:['worker'] },
  carpenter:{ label:'Carpintero/a', icon:'job:carpenter', category:'craft', baseIncome:3.5, primarySkill:'craftsmanship', apprenticeshipRequired:true, familyLearned:false, stages:['helper','apprentice','worker','skilled','master'] },
  blacksmith:{ label:'Herrero/a', icon:'job:blacksmith', category:'craft', baseIncome:4, primarySkill:'craftsmanship', apprenticeshipRequired:true, familyLearned:false, stages:['helper','apprentice','worker','skilled','master'] },
  baker:{ label:'Panadero/a', icon:'job:baker', category:'craft', baseIncome:3, primarySkill:'craftsmanship', apprenticeshipRequired:true, familyLearned:false, stages:['helper','apprentice','worker','skilled'] },
  miller:{ label:'Molinero/a', icon:'job:miller', category:'craft', baseIncome:3.5, primarySkill:'commerce', apprenticeshipRequired:true, familyLearned:false, stages:['helper','apprentice','worker','skilled'] },
  guard:{ label:'Guardia local', icon:'job:guard', category:'service', baseIncome:3, primarySkill:'commerce', apprenticeshipRequired:false, familyLearned:false, stages:['worker','skilled'] },
  fisher:{ label:'Pescador/a', icon:'job:fisher', category:'agriculture', baseIncome:2.5, primarySkill:'animal_husbandry', apprenticeshipRequired:false, familyLearned:true, stages:['helper','worker','skilled'] },
  miner:{ label:'Minero/a', icon:'job:miner', category:'labor', baseIncome:3.5, primarySkill:'craftsmanship', apprenticeshipRequired:true, familyLearned:false, stages:['helper','apprentice','worker','skilled'] }
};

/* lugares del pueblo: contexto para profesiones/eventos/encuentros, NO un mapa navegable (Parte 14) */
export const PLACES = {
  home:{icon:'place:home',label:'Hogares'}, smithy:{icon:'place:smithy',label:'Herrería'}, carpentry:{icon:'place:carpentry',label:'Taller del carpintero'},
  mill:{icon:'place:mill',label:'Molino'}, bakery:{icon:'place:bakery',label:'Horno y panadería'}, church:{icon:'place:church',label:'Iglesia'},
  lordRoad:{icon:'place:lordRoad',label:'Camino hacia el señorío'}, fields:{icon:'place:fields',label:'Campos'}, pastures:{icon:'place:pastures',label:'Pastizales'}
};

/* nombres de animales (Parte 40): nunca mostrar un ID técnico como "vaca #a829" */
export const ANIMAL_NAMES = {
  cow:['Bruna','Mora','Alba','Castaña','Parda','Luna','Rojiza','Manchada'],
  sheep:['Nube','Lana','Mota','Blanca','Rizos','Vellón','Copo','Grisela'],
  chicken:['Rufa','Peca','Roja','Pluma','Canela','Pinta','Cresta','Dorada'],
  goat:['Roca','Cuernos','Terca','Parda','Trepa','Barbuda','Gris','Salta']
};

/* =========================================================
   GEOGRAFÍA Y CRONOLOGÍA DEL MUNDO (mejora de diseño 2026-09, puntos 1-4 y 18)
   ---------------------------------------------------------
   El mundo ya no empieza a existir cinco minutos antes del jugador ni se limita siempre al
   año ~500: cada partida nueva nace en UNA región concreta (REGIONS, con su propio bioma,
   economía y color — punto 4/5) dentro de un reino con una cronología propia escrita de
   antemano (WORLD_TIMELINE, siglos de sucesos con fecha — punto 1/2). El personaje NUNCA
   conoce todo esto de golpe: solo lo que vive él mismo (se añade solo, año a año, si el
   suceso cae dentro de su vida — knownHistoryIds) o lo que le cuentan por el camino
   (resolveHistoryDiscovery, más abajo — familiares, sacerdotes, viajeros, ferias...). Guardado
   internamente pero mostrado con cuentagotas, tal como pide el punto 18. */
export const REGIONS = {
  fenwold:{ id:'fenwold', biome:'valle fértil', region:'Marca de Fenwold', villageName:'Wistleigh',
    houseName:'Hallowmere', foundedYear:118,
    rulers:[{name:'Lord Aldric de Hallowmere',from:126},{name:'Lord Ridley de Hallowmere',from:487},{name:'Lord Wynfred de Hallowmere',from:612},{name:'Lord Osgar de Hallowmere',from:781}],
    fertilityBias:8, animals:['cow','sheep','chicken'], professionBias:['peasant_farmer','shepherd','miller','baker'],
    palette:'valley', clothing:'lana teñida y lino basto', food:'pan de trigo, guiso de cebada y queso de vaca',
    riskFlavor:'las malas cosechas y las crecidas del río' },
  fells:{ id:'fells', biome:'montaña', region:'Los Altos de Kelmarsh', villageName:'Kelmarsh',
    houseName:'Kelmarsh', foundedYear:210,
    rulers:[{name:'Lord Bryn de Kelmarsh',from:216},{name:'Lord Garrick de Kelmarsh',from:401},{name:'Lady Isolde de Kelmarsh',from:588},{name:'Lord Talan de Kelmarsh',from:733}],
    fertilityBias:-16, animals:['sheep','goat'], professionBias:['shepherd','miner','blacksmith'],
    palette:'mountain', clothing:'pieles y lana gruesa', food:'queso de cabra, avena y carne curada',
    riskFlavor:'los aludes de nieve y los pasos cerrados por el hielo' },
  mere:{ id:'mere', biome:'costa', region:'La Ribera de Saltmere', villageName:'Saltmere',
    houseName:'Saltmere', foundedYear:265,
    rulers:[{name:'Lord Corwin de Saltmere',from:271},{name:'Lady Elga de Saltmere',from:455},{name:'Lord Hew de Saltmere',from:640},{name:'Lord Padraic de Saltmere',from:820}],
    fertilityBias:-5, animals:['sheep','chicken'], professionBias:['fisher','laborer','guard'],
    palette:'coast', clothing:'lana encerada contra la sal', food:'pescado salado, mejillones y pan de cebada',
    riskFlavor:'las tormentas y el marisco en mal estado' },
  reach:{ id:'reach', biome:'semidesierto', region:'La Sequía de Ashdry', villageName:'Ashdry',
    houseName:'Ashcombe', foundedYear:340,
    rulers:[{name:'Lord Tobias Ashcombe',from:346},{name:'Lady Maren Ashcombe',from:520},{name:'Lord Cael Ashcombe',from:702}],
    fertilityBias:-20, animals:['goat','chicken'], professionBias:['shepherd','laborer','guard'],
    palette:'dry', clothing:'lino ligero y pañuelos contra el polvo', food:'pan ácimo, cabra asada y dátiles secos',
    riskFlavor:'la sequía y los pozos que se secan' },
  moor:{ id:'moor', biome:'pantano', region:'El Pantano de Hollow', villageName:'Hollowmarsh',
    houseName:'Oldbrook', foundedYear:295,
    rulers:[{name:'Lord Ewan Oldbrook',from:301},{name:'Lord Berne Oldbrook',from:470},{name:'Lady Sibb Oldbrook',from:658},{name:'Lord Aldous Oldbrook',from:810}],
    fertilityBias:-10, animals:['sheep','chicken'], professionBias:['laborer','farm_worker','fisher'],
    palette:'marsh', clothing:'capas de lana engrasada', food:'anguila ahumada, turba y pan negro de centeno',
    riskFlavor:'las fiebres del pantano y las crecidas de la turbera' }
};

export const WORLD_TIMELINE=[
  {id:'aldemark_unified', year:80, type:'founding', regionId:'global', title:'Se unifica el Reino de Aldemark', text:'Tras generaciones de reyes menores en guerra, Aldemark I corona un solo reino y reparte marcas entre sus caballeros más leales.'},
  {id:'founding_fenwold', year:118, type:'founding', regionId:'fenwold', title:'Fundación de Wistleigh', text:'Colonos del valle se asientan junto al vado del río Fen y levantan las primeras casas de Wistleigh.'},
  {id:'house_hallowmere', year:126, type:'house_founded', regionId:'fenwold', title:'Fundación de la Casa Hallowmere', text:'El rey nombra a Aldric de Hallowmere primer señor de la Marca de Fenwold, a cambio de su espada en la unificación.'},
  {id:'faith_seven_lamps', year:151, type:'religious', regionId:'global', title:'Llegan los Siete Faros', text:'Misioneros itinerantes traen la Fe de los Siete Faros a Aldemark; con los años desplaza a los viejos cultos del bosque en casi todo el reino.'},
  {id:'founding_fells', year:210, type:'founding', regionId:'fells', title:'Fundación de Kelmarsh', text:'Buscadores de plata suben a los Altos y fundan Kelmarsh junto a la primera mina abierta en la ladera.'},
  {id:'house_kelmarsh', year:216, type:'house_founded', regionId:'fells', title:'Fundación de la Casa Kelmarsh', text:'La corona concede los Altos de Kelmarsh a Bryn de Kelmarsh a cambio de un tributo en plata, no en grano.'},
  {id:'founding_mere', year:265, type:'founding', regionId:'mere', title:'Fundación de Saltmere', text:'Pescadores huidos de una costa hostigada por piratas se asientan en la ribera protegida y fundan Saltmere.'},
  {id:'house_saltmere', year:271, type:'house_founded', regionId:'mere', title:'Fundación de la Casa Saltmere', text:'Corwin de Saltmere recibe la ribera en feudo, con la condición de levantar una flota que vigile la costa.'},
  {id:'founding_moor', year:295, type:'founding', regionId:'moor', title:'Fundación de Hollowmarsh', text:'Familias que huían de una hambruna se internan en el pantano y aprenden a vivir sobre pasarelas de turba.'},
  {id:'house_oldbrook', year:301, type:'house_founded', regionId:'moor', title:'Fundación de la Casa Oldbrook', text:'Ewan Oldbrook, antiguo cazador de anguilas, es nombrado señor del Pantano de Hollow por sacar adelante a los suyos.'},
  {id:'founding_reach', year:340, type:'founding', regionId:'reach', title:'Fundación de Ashdry', text:'Una caravana de pastores trashumantes se establece junto al último pozo antes del desierto y funda Ashdry.'},
  {id:'house_ashcombe', year:346, type:'house_founded', regionId:'reach', title:'Fundación de la Casa Ashcombe', text:'Tobias Ashcombe es investido señor de la Sequía de Ashdry, con el deber de mantener abiertos los pozos del camino.'},
  {id:'thornevale_war', year:402, type:'war', regionId:'fells', title:'La Guerra de Thornevale', text:'La Casa Thornevale, rival de Kelmarsh por el control de las minas, es derrotada tras tres años de guerra en los pasos de montaña.'},
  {id:'house_thornevale_extinct', year:405, type:'house_extinct', regionId:'fells', title:'Fin de la Casa Thornevale', text:'Sin herederos varones ni hembras, el nombre Thornevale se extingue; sus tierras pasan a la Casa Kelmarsh.'},
  {id:'trade_route_pass', year:409, type:'route', regionId:'fells', title:'Se abre el Paso de Kelmarsh', text:'Con la guerra terminada, mercaderes de todo el reino empiezan a cruzar el paso hacia la Marca de Fenwold, antes cerrado por la disputa.'},
  {id:'great_famine', year:441, type:'famine', regionId:'global', title:'La Gran Hambruna', text:'Tres veranos fríos seguidos arruinan las cosechas de medio Aldemark; se recuerda como la peor hambruna que vio el reino.'},
  {id:'migration_fenwold', year:444, type:'migration', regionId:'fenwold', title:'Llegada de los refugiados del norte', text:'Familias huidas de la Gran Hambruna se instalan en Wistleigh y son absorbidas por sus hogares en pocos años.'},
  {id:'wyndham_alliance', year:530, type:'marriage_alliance', regionId:'fenwold', title:'Alianza matrimonial con la Casa Wyndham', text:'Una hija de Hallowmere se casa con el heredero de la Casa Wyndham, sellando una alianza que dura generaciones.'},
  {id:'fenwold_keep', year:567, type:'construction', regionId:'fenwold', title:'Se levanta la torre de Fenhold', text:'La Casa Hallowmere termina de construir su fortaleza de piedra junto a Wistleigh, tras once años de obras.'},
  {id:'saltmere_storm', year:598, type:'disaster', regionId:'mere', title:'La Gran Tormenta de Saltmere', text:'Una tormenta hunde media flota pesquera de Saltmere en una sola noche; el pueblo tarda una generación en recuperarse.'},
  {id:'ashdry_drought', year:631, type:'famine', regionId:'reach', title:'La Sequía Larga', text:'Siete años sin lluvias secan los pozos menores de Ashdry; muchas familias emigran hacia la Marca de Fenwold.'},
  {id:'moor_rebellion', year:658, type:'rebellion', regionId:'moor', title:'La Revuelta del Pantano', text:'Los aldeanos de Hollowmarsh se alzan contra un tributo que no podían pagar; la Casa Oldbrook cede y lo reduce a la mitad.'},
  {id:'fenwold_prosperity', year:690, type:'prosperity', regionId:'fenwold', title:'Los años dorados de Fenwold', text:'Tres décadas de buenas cosechas y comercio libre por el Paso de Kelmarsh convierten a Wistleigh en un mercado próspero.'},
  {id:'kelmarsh_mine_collapse', year:705, type:'disaster', regionId:'fells', title:'El derrumbe de la mina vieja', text:'La mina más antigua de Kelmarsh se derrumba con una veintena de mineros dentro; desde entonces se abren nuevas galerías con más cuidado.'},
  {id:'faith_reform', year:742, type:'religious', regionId:'global', title:'La Reforma de los Faros', text:'Un concilio de sacerdotes simplifica los ritos de la Fe de los Siete Faros; algunos pueblos remotos siguen practicando la forma antigua.'},
  {id:'border_war', year:788, type:'war', regionId:'global', title:'La Guerra de la Marca Gris', text:'Aldemark repele una invasión por el este; hombres de todas las marcas, incluida Fenwold, son reclutados para la campaña.'},
  {id:'saltmere_lighthouse', year:825, type:'construction', regionId:'mere', title:'El faro de Saltmere', text:'Tras años pidiéndolo, Saltmere obtiene permiso real y fondos para levantar un faro en la punta de la ribera.'},
  {id:'ashdry_new_well', year:860, type:'prosperity', regionId:'reach', title:'El pozo profundo de Ashdry', text:'Ingenieros del reino ayudan a Ashdry a cavar un pozo que no se seca ni en los peores veranos; el pueblo vuelve a crecer.'},
  {id:'moor_bridge', year:890, type:'route', regionId:'moor', title:'El puente de troncos de Hollowmarsh', text:'Un camino de troncos por fin cruza el pantano de punta a punta, uniendo Hollowmarsh con el resto del reino todo el año.'}
];
