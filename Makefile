#
# SO variables
#


#
# Internal variables
#
VERSION := $$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})
SVC=ioled-frontend-app
PORT=3000
REGISTRY_URL=gcr.io/ioled-dev-262215

version v:
	@echo $(VERSION)

init i:
	@echo "[prepare] preparing..."
	@npm install

clean c:
	@echo "[clean] cleaning..."

run r:
	@echo "[running] Running nodejs and React..."
	@npm run dev

dev d:
	@echo "[running] Running nodejs and Reac..."
	@npm run dev2

.PHONY: version v prepare pre clean c run r stop s