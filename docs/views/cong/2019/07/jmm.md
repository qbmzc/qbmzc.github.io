---
title: JMM
date: 2019-07-23
tags:
 - JMM
categories:
 - Java
prev: build_blog.md
next: tomcat.md

---

![a](https://fastly.jsdelivr.net/gh/qbmzc/images/2021/202111231223195.png)

<!-- more -->

&emsp;&emsp;JMM,Java的内存模型。

![JMM](https://i.loli.net/2021/03/24/qMia5s23J9fdlr7.png)
## 原子性（Atomicity）

> 原子性是指一个操作是不可中断的。即使是在多个线程一起执行的时候，一个操作一旦开始，就不会被其他线程干扰。  

*注意，对于32位系统来说，long型数据的读写不是原子性的，因为long有64位。*

## 可见性（Visibility）

> 可见性是指当一个线程修改了某一个共享变量的值，其他线程是否能够立即知道这个修改。
显然，对于串行程序来说，可见性问题是不存在的。因为你在任何一个操作步骤中修改了某个变量，那么在后续的步骤中，读取这个变量的值，一定是修改后的新值。

&emsp;&emsp;但是这个问题在并行程序中就不见得了。如果一个线程修改了某一个全局变量，那么其他线程未必可以马上知道这个改动。图1.14展示了发生可见性问题的一种可能。如果在CPU1和CPU2上各运行了一个线程，它们共享变量t，由于编译器优化或者硬件优化的缘故，在CPU1上的线程将变量t进行了优化，将其缓存在cache中或者寄存器里。这种情况下，如果在CPU2上的某个线程修改了变量t的实际值，那么CPU1上的线程可能并无法意识到这个改动，依然会读取cache中或者寄存器里的数据。因此，就产生了可见性问题。外在表现为：变量t的值被修改，但是CPU1上的线程依然会读到一个旧值。可见性问题也是并行程序开发中需要重点关注的问题之一。  
&emsp;&emsp;除了上述提到的缓存优化或者硬件优化（有些内存读写可能不会立即触发，而会先进入一个硬件队列等待）会导致可见性问题外，指令重排（这个问题将在下一节中更详细讨论）以及编辑器的优化，都有可能导致一个线程的修改不会立即被其他线程察觉。 

## 有序性（Ordering）

&emsp;&emsp;有序性问题可能是三个问题中最难理解的了。对于一个线程的执行代码而言，我们总是习惯地认为代码的执行是从先往后，依次执行的。这么理解也不能说完全错误，因为就一个线程内而言，确实会表现成这样。但是，在并发时，程序的执行可能就会出现乱序。给人直观的感觉就是：写在前面的代码，会在后面执行。听起来有些不可思议，是吗？有序性问题的原因是因为程序在执行时，可能会进行指令重排，重排后的指令与原指令的顺序未必一致。  

```java

class OrderExample {
    int a = 0;
    boolean flag = false;
    public void writer() {
        a = 1;
        flag = true;
    }
    public void reader() {
        if (flag) {
        int i =  a +1;
            ……
        }
    }
 }
```

&emsp;&emsp;假设线程A首先执行writer()方法，接着线程B执行reader()方法，如果发生指令重排，那么线程B在代码第10行时，不一定能看到a已经被赋值为1了。
&emsp;&emsp;这确实是一个看起来很奇怪的问题，但是它确实可能存在。注意：我这里说的是可能存在。因为如果指令没有重排，这个问题就不存在了，但是指令是否发生重排、如何重排，恐怕是我们无法预测的。因此，对于这类问题，我认为比较严谨的描述是：线程A的指令执行顺序在线程B看来是没有保证的。如果运气好的话，线程B也许真的可以看到和线程A一样的执行顺序。  
&emsp;&emsp;不过这里还需要强调一点，对于一个线程来说，它看到的指令执行顺序一定是一致的（否则的话我们的应用根本无法正常工作，不是吗？）。也就是说指令重排是有一个基本前提的，就是保证串行语义的一致性。指令重排不会使串行的语义逻辑发生问题。因此，在串行代码中，大可不必担心。 

### 指令重排

&emsp;&emsp;**_注意：指令重排可以保证串行语义一致，但是没有义务保证多线程间的语义也一致。_**  
&emsp;&emsp;那么，好奇的你可能马上就会在脑海里闪出一个疑问，为什么要指令重排呢？让他一步一步执行多好呀！也不会有那么多奇葩的问题。  
&emsp;&emsp;之所以那么做，完全是因为性能考虑。我们知道，一条指令的执行是可以分为很多步骤的。简单地说，可以分为以下几步：

* 取指IF
* 译码和取寄存器操作数ID
* 执行或者有效地址计算EX
* 存储器访问MEM
* 写回WB  

&emsp;&emsp;我们的汇编指令也不是一步就可以执行完毕的，在CPU中实际工作时，它还是需要分为多个步骤依次执行的。当然，每个步骤所涉及的硬件也可能不同。比如，取指时会用到PC寄存器和存储器，译码时会用到指令寄存器组，执行时会使用ALU，写回时需要寄存器组。  
&emsp;&emsp;**注意：ALU指算术逻辑单元。它是CPU的执行单元，是CPU的核心组成部分，主要功能是进行二进制算术运算。**  
&emsp;&emsp;由于每一个步骤都可能使用不同的硬件完成，因此，聪明的工程师们就发明了流水线技术来执行指令，如下所示，显示了流水线的工作原理。  

```bash
指令1 IF ID EX MEM WB
指令2    IF ID EX MEM WB 
```

&emsp;&emsp;可以看到，当第2条指令执行时，第1条执行其实并未执行完，确切地说第一条指令还没开始执行，只是刚刚完成了取值操作而已。这样的好处非常明显，假如这里每一个步骤都需要花费1毫秒，那么指令2等待指令1完全执行后，再执行，则需要等待5毫秒，而使用流水线后，指令2只需要等待1毫秒就可以执行了。如此大的性能提升，当然让人眼红。更何况，实际的商业CPU的流水线级别甚至可以达到10级以上，则性能提升就更加明显。  
&emsp;&emsp;流水线带来性能的提升，但是一旦中断，再次满载的话耗费时间，损失性能。指令重排的原因就是尽量减少中断流水线，这只是其中一种技术。  

```bash
A = B + c
LW R1,B     IF ID EX MEM WB  #把B的值加载到R1寄存器中
LW R2,C        IF ID EX  MEM WB  #把C的值加载到R2寄存器中
ADD R3,R1,R2      IF ID  X   EX   MEM WB  #把R1+R2的值放到R3寄存器中,X代表中断
SW  A,R3             IF  X   ID   EX  MEM WB  #将R3寄存器的值保存到变量A中，X代表中断
```

&emsp;&emsp;由于R2中的数据还没有准备好，ADD在这里会中断，后面的指令都会慢一拍。  

```java
a=b+c
d=e-f
```

![指令重排前](https://fastly.jsdelivr.net/gh/qbmzc/images/md/20190806092156066_1331857751.png)
![指令调换](https://raw.githubusercontent.com/qbmzc/images/master/mdimage/2019/08/20190806092207322_887558282.png)

![指令重排后](https://raw.githubusercontent.com/qbmzc/images/master/mdimage/2019/08/20190806092218994_1027072772.png)

## 哪些指令不能重排：Happen-Before规则

&emsp;&emsp;在前文已经介绍了指令重排，虽然Java虚拟机和执行系统会对指令进行一定的重排，但是指令重排是有原则的，并非所有的指令都可以随便改变执行位置，以下罗列了一些基本原则，这些原则是指令重排不可违背的。  

* 程序顺序原则：一个线程内保证语义的串行性
* volatile规则：volatile变量的写，先发生于读，这保证了volatile变量的可见性
* 锁规则：解锁（unlock）必然发生在随后的加锁（lock）前
* 传递性：A先于B，B先于C，那么A必然先于C
* 线程的start()方法先于它的每一个动作
* 线程的所有操作先于线程的终结（Thread.join()）
* 线程的中断（interrupt()）先于被中断线程的代码
* 对象的构造函数执行、结束先于finalize()方法

以程序顺序原则为例，重排后的指令绝对不能改变原有的串行语义。比如：

```java
a=1;
b=a+1;
```

&emsp;&emsp;由于第2条语句依赖第一条的执行结果。如果冒然交换两条语句的执行顺序，那么程序的语义就会修改。因此这种情况是绝对不允许发生的。因此，这也是指令重排的一条基本原则。  
&emsp;&emsp;此外，锁规则强调，unlock操作必然发生在后续的对同一个锁的lock之前。也就是说，如果对一个锁解锁后，再加锁，那么加锁的动作绝对不能重排到解锁动作之前。很显然，如果这么做，加锁行为是无法获得这把锁的。  
&emsp;&emsp;其他几条原则也是类似的，这些原则都是为了保证指令重排不会破坏原有的语义结构。

### Volatile

> volatile
美 ['vɑlət(ə)l]
英 ['vɒlətaɪl]

1. 内存可见性
2. 防止指令重排

`volatile`修饰符适用于以下场景：某个属性被多个线程共享，其中有一个线程修改了此属性，其他线程可以立即得到修改后的值。

```java
/**
 * volatile保证可见性，而synchronized保证原子性
 */
public class Test6 {

    volatile int count = 0;

    public synchronized void m() {
        for (int i = 0; i < 10000; i++) {
            count++;
        }
    }

    public static void main(String[] args) {
        Test6 t = new Test6();
        List<Thread> threads = new ArrayList<>();
        // 创建10个线程
        for (int i = 0; i < 10; i++) {
            threads.add(new Thread(new Runnable() {
                public void run() {
                    t.m();
                }
            }));
        }
        // 启动线程
        for (Thread thread : threads) {
            thread.start();
        }
        // 确保10个线程执行完毕后，再执行主线程的输出
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(t.count);// 输出100000
    }
}
```

```java
 public class Singleton {  
     private volatile static Singleton singleton;  
     private Singleton (){}  
     public static Singleton getSingleton() {  
     if (singleton == null) {  
         synchronized (Singleton.class) {  
         if (singleton == null) {  
             singleton = new Singleton();  
        }  
         }  
     }  
    return singleton;  
    }  
}
```
