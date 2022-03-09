# How to create Kafka trigger in azure function

1.  SetUp Kafka locally(DOCKER):

        Prerequisite
            You need to have docker installed on your machine
            You need to have docker-compose installed on your machine

        Step 1 : Create a yaml file
            touch docker-compose.yml

        Step 2 : Put the below contents in the docker compose file

            version: '3'

                services:
                  zookeeper:
                    image: wurstmeister/zookeeper
                    container_name: zookeeper
                    ports:
                      - 2181:2181
                    environment:
                      KAFKA_ADVERTISED_HOST_NAME: localhost
                      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
                      KAFKA_TOPIC_MAX_MESSAGE_BYTES: 104857600
                      KAFKA_REPLICA_FETCH_MAX_BYTES: 104857600
                      KAFKA_MESSAGE_MAX_BYTES: 104857600


                  kafka:
                    image: wurstmeister/kafka
                    container_name: kafka
                    ports:
                      - 9092:9092
                    environment:
                      KAFKA_ADVERTISED_HOST_NAME: localhost
                      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
                      KAFKA_TOPIC_MAX_MESSAGE_BYTES: 104857600
                      KAFKA_REPLICA_FETCH_MAX_BYTES: 104857600
                      KAFKA_MESSAGE_MAX_BYTES: 104857600

        Step 3 : Start the service
            You can start the service in foreground mode using

                docker-compose -f docker-compose.yml up

            If you want to start the service in background mode then you can use the below command

                docker-compose -f docker-compose.yml up -d

        Step 4 : config Kafka

            create a kafka topic
                ./kafka-topics.sh  --create --topic testTopic --zookeeper zookeeper:2181 --partitions 2 --replication-factor 1

            delete a kafka topic
                ./kafka-topics.sh  --delete --topic testTopic --zookeeper zookeeper:2181

            connect to kafka producer console
                ./kafka-console-producer.sh  --broker-list localhost:9092 --topic testTopic

2.  Create Azure function App:

        Step 1 : use function.json

                {
                    "bindings": [
                        {
                            "type": "kafkaTrigger",
                            "name": "event",
                            "direction": "in",
                            "topic": "testTopic",
                            "brokerList": "localhost:9092",
                            "consumerGroup": "testGroup",
                            "dataType": "binary"
                        }
                    ]
                }

        Step 2 : use host.json

            {
                "version": "2.0",
                "extensions": {
                    "kafka": {
                        [refer file kafka host json configuration](./kafka_host_json_configuration.md)
                    }
                }
            }

        Step 3 : use local.settings.json
            {
                "IsEncrypted": false,
                "Values": {
                    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
                    "FUNCTIONS_WORKER_RUNTIME": "node",
                    "BrokerList": "http://localhost:9092"
                }
            }

        Step 4 : use index.js

            async function handler(context, event) {
                context.log.info("KafkaTrigger - handler - start");
                context.log.info(event.toString("utf8"));
                /*TODO FUNCTION LOGICS*/
                context.log.info("KafkaTrigger - handler - end.");
                context.done();
            }

            module.exports = handler;

        Step 5 : install the dot net version 3.1, [dotnet-sdk-3.1.405-win-x64.exe](https://dotnet.microsoft.com/download/dotnet-core/3.1), note: your PC/device must have only this version

        Step 6 : use below command in the function app path, In my case "./kafka trigger/kafkaTrigger" it will install kafka dotnet azure function internal dependencies.

                func extensions install --package Microsoft.Azure.WebJobs.Extensions.Kafka --version 2.0.0-beta
        ##Note:
            use below commands to install the following triggers:
                Kafka Trigger   :   func extensions install --package Microsoft.Azure.WebJobs.Extensions.Kafka --version 2.0.0-beta
                Storage Trigger :   func extensions install --package Microsoft.Azure.WebJobs.Extensions.Storage --version 4.0.2

        Step 7 : Done

3.  To Start The Execution:

        Step 1 : Run the docker service
        Step 2 : Run the azure functions
        Step 3 : produce some data , Hurray the data got consoled into azure function
