setup:
	pip install mkdocs
	pip install mkdocs-material
	pip install mkdocs-markdownextradata-plugin

sync:
	mkdir -p docs/textileio/go-textile
	mkdir -p docs/textileio/react-native-sdk
	mkdir -p docs/textileio/js-http-client
	mkdir -p docs/textileio/android-textile
	mkdir -p docs/textileio/ios-textile
	wget https://raw.githubusercontent.com/textileio/go-textile/master/README.md -O docs/textileio/go-textile/index.md
	wget https://raw.githubusercontent.com/textileio/react-native-sdk/master/README.md -O docs/textileio/react-native-sdk/index.md
	wget https://raw.githubusercontent.com/textileio/js-http-client/master/README.md -O docs/textileio/js-http-client/index.md
	wget https://raw.githubusercontent.com/textileio/android-textile/master/README.md -O docs/textileio/android-textile/index.md
	wget https://raw.githubusercontent.com/textileio/ios-textile/master/README.md -O docs/textileio/ios-textile/index.md

serve:
	mkdocs serve

build:
	mkdocs build

deploy:
	mkdocs gh-deploy

.PHONY: setup sync serve build deploy
