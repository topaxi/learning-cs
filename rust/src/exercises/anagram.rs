use std::collections::HashMap;

pub fn is_anagram(str1: &str, str2: &str) -> bool {
    let mut hash: HashMap<char, i32> = HashMap::new();

    for char in str1.chars() {
        hash.entry(char).and_modify(|n| *n += 1).or_insert(1);
    }

    for char in str2.chars() {
        hash.entry(char).and_modify(|n| *n -= 1).or_insert(-1);
    }

    hash.values().all(|n| *n == 0)
}

#[cfg(test)]
mod tests {
    use super::is_anagram;

    #[test]
    fn it_should_return_true_if_strings_are_anagrams() {
        assert!(is_anagram("", ""));
        assert!(is_anagram("ab", "ab"));
        assert!(is_anagram("aa", "aa"));
        assert!(is_anagram("aab", "aba"));
        assert!(is_anagram("aab", "aab"));
    }

    #[test]
    fn it_should_return_false_if_strings_are_not_anagrams() {
        assert!(!is_anagram("aa", "a"));
        assert!(!is_anagram("ab", "ac"));
    }
}
