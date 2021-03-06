package com.hp.manage.web.core.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter;

public class UeditorFilter extends StrutsPrepareAndExecuteFilter {
 public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
  HttpServletRequest request = (HttpServletRequest) req;
  String url = request.getRequestURI();
  if (url.endsWith("controller.jsp")) {
   chain.doFilter(req, res);
  }
  // 拦截使用默认的拦截
  else {
   super.doFilter(req, res, chain);
  }
 }}
