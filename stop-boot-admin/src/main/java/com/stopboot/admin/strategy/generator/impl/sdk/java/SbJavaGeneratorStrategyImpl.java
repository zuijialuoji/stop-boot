package com.stopboot.admin.strategy.generator.impl.sdk.java;


import com.stopboot.admin.strategy.generator.SbGeneratorStrategy;
import com.stopboot.admin.strategy.generator.SbGeneratorStrategyParams;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: Lianyutao
 * @create: 2019-10-16 21:06
 * @version:
 **/
@Service
public class SbJavaGeneratorStrategyImpl implements SbGeneratorStrategy {

    @Override
    public boolean judge(SbGeneratorStrategyParams marketStrategyParam) {
        return false;
    }

    @Override
    public void execute(SbGeneratorStrategyParams marketStrategyParam) {

    }
}
