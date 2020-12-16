FROM bitwalker/alpine-elixir-phoenix:latest

RUN apk --no-cache --update add yarn

ADD mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

ADD assets/package.json assets/
ADD assets/yarn.lock assets/
RUN yarn --cwd ./assets install

CMD ["mix", "ecto.create"]
CMD ["mix", "phx.server"]
