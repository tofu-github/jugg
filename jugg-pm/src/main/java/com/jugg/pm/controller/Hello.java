package com.jugg.pm.controller;

import sun.misc.Unsafe;

import java.util.concurrent.locks.ReentrantLock;

public class Hello {
    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock();
        lock.lock();
    }

    static Integer test(Integer t){
        t = t+12;
        return t;
    }
}
