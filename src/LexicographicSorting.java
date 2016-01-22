import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

public class LexicographicSorting {

	private Map<Character, Integer> a_map;

	public List<String> sort(List<String> p_strlist, String p_order) {
		a_map = new HashMap<Character, Integer>();
		
		if (p_strlist == null || p_strlist.size() == 0 || p_order == null
				|| p_order.length() == 0) {
			return p_strlist;
		}

		for (int i = 0; i < p_order.length(); i++) {
			a_map.put(p_order.charAt(i), i);
		}

		Collections.sort(p_strlist, new Comparator<Object>() {
			@Override
			public int compare(Object a1, Object a2) {
				String str1 = (String) a1;
				String str2 = (String) a2;
				int i = 0;
				while (str1.length() > i && str2.length() > i) {
					if (a_map.get(str1.charAt(i)) < a_map.get(str2.charAt(i))) {
						return -1;
					} else if (a_map.get(str1.charAt(i)) > a_map.get(str2
							.charAt(i))) {
						return 1;
					}
					i++;
				}
				if (i == str1.length() && i == str2.length()) {
					return 0;
				} else if (i == str1.length()) {
					return -1;
				} else {
					return 1;
				}
			}
		});

		return p_strlist;
	}

	@Test
	public void test1() {
		List<String> strlist = new ArrayList<String>();

		strlist.add("acb");
		strlist.add("abc");
		strlist.add("bca");
		strlist = sort(strlist, "abc");

		assertEquals(strlist.get(0), "abc");
		assertEquals(strlist.get(1), "acb");
		assertEquals(strlist.get(2), "bca");

		strlist = sort(strlist, "cba");

		assertEquals(strlist.get(0), "bca");
		assertEquals(strlist.get(1), "acb");
		assertEquals(strlist.get(2), "abc");

		strlist.removeAll(strlist);

		strlist.add("aaa");
		strlist.add("aa");
		strlist.add("");
		strlist = sort(strlist, "a");

		assertEquals(strlist.get(0), "");
		assertEquals(strlist.get(1), "aa");
		assertEquals(strlist.get(2), "aaa");
		
		strlist.removeAll(strlist);

		strlist.add("aedgdaaergfgfg");
		strlist.add("aedgdaajrgfgfg");
		strlist.add("fgfghjytj");
		strlist.add("fgfghayji");
		strlist = sort(strlist, "yjghfaedir");

		assertEquals(strlist.get(0), "fgfghjytj");
		assertEquals(strlist.get(1), "fgfghayji");
		assertEquals(strlist.get(2), "aedgdaajrgfgfg");
		assertEquals(strlist.get(3), "aedgdaaergfgfg");

	}
}
