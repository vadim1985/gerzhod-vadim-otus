## server start
npm run start

##use with
npx autocannon -c 500 localhost:3000

##before

|Stat|2.5%|50%|97.5%|99%|Avg|Stdev|Max|
|---	|---	|---	|---	|---	|---	|---	|---	|
|Latency|72 ms|75 ms|101 ms|122 ms|78.03 ms|17.93 ms|304.57 ms|

|Stat|1%|2.5% |50%|97.5%|Avg|Stdev|Min|
|---	|---	|---	|---	|---	|---	|---	|---	|
|Req/Sec|4195|4195|6571|6695|6374.4|729.85|4192|
|Bytes/Sec|7.83 MB|7.83 MB|12.3 MB|12.5 MB|11.9 MB|1.36 MB|7.83 MB|

##afrer
|Stat|2.5%|50%|97.5%|99%|Avg|Stdev|Max|
|---	|---	|---	|---	|---	|---	|---	|---	|
|Latency|1 ms|6 ms|214 ms|277 ms|60.37 ms|72.49 ms|551.86 ms|

|Stat|1%|2.5% |50%|97.5%|Avg|Stdev|Min|
|---	|---	|---	|---	|---	|---	|---	|---	|
|Req/Sec|3099|3099|9103|11391|8184.82|2338.49|3098|
|Bytes/Sec|5.79 MB|5.79 MB|17 MB|21.3 MB|15.3 MB|4.37 MB|5.78 MB|