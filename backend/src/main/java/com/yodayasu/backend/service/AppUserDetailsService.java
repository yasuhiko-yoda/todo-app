package com.yodayasu.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService  {

}

//@Service
//public class AppUserDetailsService7 implements UserDetailsService {
//
//    private final AppUserRepository7 appUserRepository;
//
//    public AppUserDetailsService7(AppUserRepository7 appUserRepository) {
//        this.appUserRepository = appUserRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        var appUser = appUserRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException(username + " is not found"));
//
//        return User.withUsername(appUser.getUsername())
//                .password(appUser.getPassword())
//                .authorities(appUser.getRole().name())
//                .build();
//    }
//}
