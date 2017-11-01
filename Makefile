.PHONY: webpack start bukld open

webpack:
	rm -rf bundle/index.js
	npx webpack

start:
	./node_modules/.bin/electron .

build: webpack
	./node_modules/.bin/electron-packager . castapp \
		--platform=darwin --arch=x64 \
		--asar \
		--out=dist \
		--overwrite

open:
	open -a `pwd`/dist/castapp-darwin-x64/castapp.app
