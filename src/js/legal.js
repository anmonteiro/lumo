/* @flow */

export function printLegalInformation(): void {
  process.stdout.write(`
Lumo
----

Copyright © 2016 António Nuno Monteiro
Distributed under the Eclipse Public License either version 1.0 or (at your
option) any later version.

Lumo may use the following copyrighted software, which use is hereby
acknowledged.


JSZip
-----

Copyright © 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger,
António Afonso
MIT License


minimist
--------

Copyright © 2010 James Halliday (mail@substack.net)
MIT License


lazy-map
--------

Copyright © 2015 Artur Malabarba
Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
`);
}
