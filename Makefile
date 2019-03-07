build:
	mkdocs build

clean:
	rm dist/*.whl dist/*.tar.gz

sync:
	wget https://raw.githubusercontent.com/textileio/go-textile/master/README.md -O docs/textileio/go-textile/index.md
	wget https://raw.githubusercontent.com/textileio/react-native-sdk/master/README.md -O docs/textileio/react-native-sdk/index.md
	wget https://raw.githubusercontent.com/textileio/js-http-client/master/README.md -O docs/textileio/js-http-client/index.md
	wget https://raw.githubusercontent.com/textileio/android-textile/master/README.md -O docs/textileio/android-textile/index.md
	wget https://raw.githubusercontent.com/textileio/ios-textile/master/README.md -O docs/textileio/ios-textile/index.md

cssmin: template/css/base.css template/css/bootstrap-custom.css template/css/cinder.css template/css/highlight.css
	uglifycss template/css/base.css > template/css/base.min.css
	uglifycss template/css/bootstrap-custom.css > template/css/bootstrap-custom.min.css
	uglifycss template/css/cinder.css > template/css/cinder.min.css
	uglifycss template/css/highlight.css > template/css/highlight.min.css

serve:
	mkdocs serve

install:
	pip install mkdocs
	pip install mkdocs-cinder
	pip install mkdocs-markdownextradata-plugin

.PHONY: build clean sync cssmin dist serve install


