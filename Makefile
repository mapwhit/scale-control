check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	node --require jsdom-global/register --test

.PHONY: check lint test
