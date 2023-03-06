package ch.uzh.ifi.hase.soprafs23.service;

import ch.uzh.ifi.hase.soprafs23.constant.UserStatus;
import ch.uzh.ifi.hase.soprafs23.entity.User;
import ch.uzh.ifi.hase.soprafs23.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for the UserResource REST resource.
 *
 * @see UserService
 */
@WebAppConfiguration
@SpringBootTest
public class UserServiceIntegrationTest {

  @Qualifier("userRepository")
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  @BeforeEach
  public void setup() {
    userRepository.deleteAll();
  }

  @Test
  public void createUser_validInputs_success() {
    // given
    assertNull(userRepository.findByUsername("testUsername"));

    User testUser = new User();
    testUser.setName("testName");
    testUser.setUsername("testUsername");

    // when
    User createdUser = userService.createUser(testUser);

    // then
    assertEquals(testUser.getId(), createdUser.getId());
    assertEquals(testUser.getName(), createdUser.getName());
    assertEquals(testUser.getUsername(), createdUser.getUsername());
    assertNotNull(createdUser.getToken());
    assertEquals(UserStatus.OFFLINE, createdUser.getStatus());
  }

  @Test
  public void createUser_duplicateUsername_throwsException() {
    assertNull(userRepository.findByUsername("testUsername"));

    User testUser = new User();
    testUser.setName("testName");
    testUser.setUsername("testUsername");
    User createdUser = userService.createUser(testUser);

    // attempt to create second user with same username
    User testUser2 = new User();

    // change the name but forget about the username
    testUser2.setName("testName2");
    testUser2.setUsername("testUsername");

    // check that an error is thrown
    assertThrows(ResponseStatusException.class, () -> userService.createUser(testUser2));
  }


    @Test
    public void getUsers_success() {
        // given
        assertNull(userRepository.findByUsername("testUsername"));

        User testUser = new User();
        testUser.setName("testName");
        testUser.setUsername("testUsername");

        User createdUser = userService.createUser(testUser);

        // when
        List<User> users = userService.getUsers();

        // then
        assertEquals(testUser.getId(), users.get(0).getId());
        assertEquals(testUser.getName(), users.get(0).getName());
        assertEquals(testUser.getUsername(), users.get(0).getUsername());
        assertNotNull(users.get(0).getToken());
        assertEquals(UserStatus.OFFLINE, users.get(0).getStatus());
    }



    @Test
    public void getUserByUserId_success() {
        // given
        assertNull(userRepository.findByUsername("testUsername"));

        User testUser = new User();
        testUser.setName("testName");
        testUser.setUsername("testUsername");

        User createdUser = userService.createUser(testUser);

        // when
        User userByUserId = userService.getUserByUserId(createdUser.getId());

        // then
        assertEquals(testUser.getId(), userByUserId.getId());
        assertEquals(testUser.getName(), userByUserId.getName());
        assertEquals(testUser.getUsername(), userByUserId.getUsername());
        assertNotNull(userByUserId.getToken());
        assertEquals(UserStatus.OFFLINE, userByUserId.getStatus());
    }


    @Test
    public void getUserByUserId_throwsException() {
        assertThrows(ResponseStatusException.class, () -> userService.getUserByUserId(1L));
    }

    @Test
    public void login_success() {
        // given
        assertNull(userRepository.findByUsername("testUsername"));

        User testUser = new User();
        testUser.setName("testName");
        testUser.setUsername("testUsername");
        testUser.setPassword("123456");

        User createdUser = userService.createUser(testUser);

        // when
        User userByUserId = userService.login(testUser);

        // then
        assertEquals(testUser.getPassword(), userByUserId.getPassword());
        assertEquals(testUser.getUsername(), userByUserId.getUsername());
        assertNotNull(userByUserId.getToken());
        assertEquals(UserStatus.OFFLINE, userByUserId.getStatus());
    }


    @Test
    public void login_throwsException() {
        User testUser = new User();
        testUser.setPassword("testName");
        testUser.setUsername("testUsername");
        assertThrows(ResponseStatusException.class, () -> userService.login(testUser));
    }


    @Test
    public void updateUser_success() {
        // given
        assertNull(userRepository.findByUsername("testUsername"));

        User testUser = new User();
        testUser.setName("testName");
        testUser.setUsername("testUsername");
        testUser.setPassword("123456");

        User createdUser = userService.createUser(testUser);

        // then
        assertDoesNotThrow(() -> userService.updateUser(testUser));
    }


    @Test
    public void updateUser_throwsException() {
        User testUser = new User();
        testUser.setId(1L);
        testUser.setPassword("testName");
        testUser.setUsername("testUsername");
        assertThrows(ResponseStatusException.class, () -> userService.updateUser(testUser));
    }


}
