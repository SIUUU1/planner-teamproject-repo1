package com.zeus.backend.security;

public class SessionAttributeWithExpiry {
    private final Object value;
    private final long expiryTime;

    public SessionAttributeWithExpiry(Object value, long expiryDurationInMillis) {
        this.value = value;
        this.expiryTime = System.currentTimeMillis() + expiryDurationInMillis;
    }

    public Object getValue() {
        if (System.currentTimeMillis() > expiryTime) {
            return null;  // 속성이 만료되었음을 나타내기 위해 null 반환
        }
        return value;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() > expiryTime;
    }
}
