import groovy.json.JsonOutput

import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Executors

def portList = [9998, 3306, 2181, 9092, 8848, 8001, 8777, 8080, 8888]
def pool = Executors.newFixedThreadPool(30)
def data = new ConcurrentHashMap()

10.times {
    def list = []
    portList.each {
        def port = it
        (0..255).each {
            addr = it
            def ip = "192.168.0.$addr"
            list << pool.submit({
                try {
                    Socket socket = new Socket()
                    socket.connect(new InetSocketAddress(ip, port), 50)
                    socket.close()
                    data.putIfAbsent(port, [] as Set)
                    data.get(port) << ip
                } catch (e) {
                }
            })

        }
    }
    list.each {
        it.get()
    }
    println JsonOutput.toJson(data)
    new File("find.txt").write(JsonOutput.toJson(data))
}


pool.shutdown()

