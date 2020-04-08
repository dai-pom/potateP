FROM golang:alpine3.10

ARG APP_ROOT

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN apk --no-cache update && \
    apk --no-cache upgrade && \
    apk --no-cache add \
    curl-dev \
    freetype-dev \
    g++ \
    make \
    autoconf \
    openssl \
    bash \
    git

RUN go get -u \
    github.com/oxequa/realize \
    github.com/gorilla/mux \
    github.com/jinzhu/gorm \
    github.com/go-sql-driver/mysql
    

# RUN go get -u \
#     github.com/golang/dep/cmd/dep \
#     bitbucket.org/liamstask/goose/cmd/goose \
#     github.com/mdempsky/gocode \
#     github.com/uudashr/gopkgs/cmd/gopkgs \
#     github.com/acroca/go-symbols \
#     golang.org/x/tools/cmd/guru \
#     golang.org/x/tools/cmd/gorename \
#     github.com/fatih/gomodifytags \
#     github.com/josharian/impl \
#     github.com/davidrjenni/reftools/cmd/fillstruct \
#     github.com/haya14busa/goplay/cmd/goplay \
#     github.com/godoctor/godoctor \
#     github.com/stamblerre/gocode \
#     github.com/rogpeppe/godef \
#     github.com/sqs/goreturns \
#     golang.org/x/lint/golint \
#     golang.org/x/tools/cmd/goimports \
#     github.com/PuerkitoBio/goquery

CMD ["realize", "start", "--server"]
