#!/bin/bash


mkdir -p src/{
  domain/{entities,value-objects,aggregates,events,repositories,exceptions,services},
  application/{use-cases,ports,dtos,event-handlers},
  infrastructure/{config,persistence/{repositories,migrations,schemas},http,security,logging,cache},
  interfaces/{http/{controllers,middlewares,dtos},events,commands,grpc}
}


find src -type d -exec touch {}/.gitkeep \;


contexts=("auth" "tasks" "users" "shared")

for context in "${contexts[@]}"; do
  mkdir -p "src/contexts/${context}/"{
    domain/{entities,value-objects,aggregates,events,repositories,services},
    application/{use-cases,ports,dtos,event-handlers},
    infrastructure/{persistence,http,security},
    interfaces/{http,events}
  }
done


touch {Dockerfile,docker-compose.yml,.env.example,README.md}
